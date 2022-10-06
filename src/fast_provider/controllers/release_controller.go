package controllers

import (
	"context"
	"fast-provider/configs"
	"fast-provider/models"
	"fast-provider/responses"
	"fast-provider/services"
	"fmt"
	"io/ioutil"
	"os"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"gopkg.in/src-d/go-git.v4"
	"gopkg.in/src-d/go-git.v4/plumbing"
)

var releaseCollection *mongo.Collection = configs.GetCollections(configs.DB, "releases")
var releaseValidate = validator.New()

func Release(c *fiber.Ctx) error {
	ctx, close := context.WithTimeout(context.Background(), 10*time.Second)
	var release models.Release
	defer close()

	if err := c.BodyParser(&release); err != nil {
		responses.SendBadRequestResponse(c, &fiber.Map{"data": err.Error()})
	}

	if validateErr := releaseValidate.Struct(&release); validateErr != nil {
		responses.SendBadRequestResponse(c, &fiber.Map{"data": validateErr.Error()})
	}

	currentTime := time.Now()
	var branchName = ""
	if release.BranchName != "" {
		branchName = "refs/heads/" + release.BranchName
	} else {
		branchName = "refs/heads/master"
	}

	newRelease := models.Release{
		ServiceId:   release.ServiceId,
		VersionTag:  release.VersionTag,
		BranchName:  branchName,
		ReleaseDate: currentTime.UTC().Format("02 January 2006"),
		ReleaseTime: currentTime.UTC().Format("15:04:05"),
	}

	res, err := releaseCollection.InsertOne(ctx, newRelease)
	if err != nil {
		responses.SendErrorResponse(c, &fiber.Map{"data": err.Error()})
	}

	opts := options.FindOneAndUpdate()
	filter := bson.D{{Key: "_id", Value: res.InsertedID}}

	update1 := bson.D{{Key: "$set", Value: bson.D{
		{Key: "status", Value: "in-progress"},
	}}}
	releaseCollection.FindOneAndUpdate(ctx, filter, update1, opts)

	// Get service details
	var service models.Service
	err = serviceCollection.FindOne(ctx, bson.M{"_id": newRelease.ServiceId}).Decode(&service)
	if err != nil {
		responses.SendErrorResponse(c, &fiber.Map{"data": err.Error()})
	}

	// Clone the repository
	dir, err := ioutil.TempDir("services", "")
	if err != nil {
		responses.SendErrorResponse(c, &fiber.Map{"data": err.Error()})
	}

	defer os.RemoveAll(dir)

	_, err = git.PlainClone(dir, false, &git.CloneOptions{
		URL:           service.Repository.Link,
		RemoteName:    "origin",
		ReferenceName: plumbing.ReferenceName(branchName),
		Progress:      os.Stdout,
		SingleBranch:  true,
	})
	if err != nil {
		responses.SendErrorResponse(c, &fiber.Map{"data": err.Error()})
	}

	update2 := bson.D{{Key: "$set", Value: bson.D{
		{Key: "status", Value: "image-building"},
	}}}
	releaseCollection.FindOneAndUpdate(ctx, filter, update2, opts)

	startTime := time.Now()
	err = services.Build(service.ServiceName, newRelease.VersionTag, dir)
	if err != nil {
		errUpdate := bson.D{{Key: "$set", Value: bson.D{
			{Key: "more_information", Value: err.Error()},
			{Key: "status", Value: "build-error"},
		}}}
		releaseCollection.FindOneAndUpdate(ctx, filter, errUpdate, opts)
		responses.SendErrorResponse(c, &fiber.Map{"data": err.Error()})
	}
	endTime := time.Now()

	var relase models.Release
	err = releaseCollection.FindOne(ctx, bson.M{"_id": res.InsertedID}).Decode(&relase)
	if err != nil {
		responses.SendErrorResponse(c, &fiber.Map{"data": err.Error()})
	}

	update3 := bson.D{{Key: "$set", Value: bson.D{
		{Key: "status", Value: "image-pushing-local"},
	}}}
	releaseCollection.FindOneAndUpdate(ctx, filter, update3, opts)

	var registryLocation = "localhost:5005"
	var imageName = registryLocation + "/" + service.ServiceName + ":" + newRelease.VersionTag

	pushStartTime := time.Now()
	err = services.Push(imageName)
	if err != nil {
		errUpdate := bson.D{{Key: "$set", Value: bson.D{
			{Key: "more_information", Value: err.Error()},
			{Key: "status", Value: "push-error"},
		}}}
		releaseCollection.FindOneAndUpdate(ctx, filter, errUpdate, opts)
		responses.SendErrorResponse(c, &fiber.Map{"data": err.Error()})
	}
	pushEndTime := time.Now()

	update4 := bson.D{{Key: "$set", Value: bson.D{
		{Key: "build_meta_data", Value: bson.M{
			"build_start_time":           startTime,
			"build_end_time":             endTime,
			"local_repo_push_start_time": pushStartTime,
			"local_repo_push_end_time":   pushEndTime,
		}},
		{Key: "status", Value: "release-complete"},
	}}}
	fmt.Print(update4)

	releaseCollection.FindOneAndUpdate(
		ctx,
		filter,
		update4,
		opts,
	)

	defer services.PruneContainers()
	defer services.PruneImages()

	var releaseDoc bson.M
	err = releaseCollection.FindOne(ctx, bson.M{"_id": res.InsertedID}).Decode(&releaseDoc)
	if err != nil {
		responses.SendErrorResponse(c, &fiber.Map{"data": err.Error()})
	}

	responses.SendSuccessResponse(c, &fiber.Map{"data": releaseDoc})
	return nil
}
