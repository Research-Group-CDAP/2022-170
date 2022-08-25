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
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
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

	newRelease := models.Release{
		Id:                 primitive.NewObjectID(),
		ServiceId:          release.ServiceId,
		ServiceReferenceId: release.ServiceReferenceId,
		VersionTag:         release.VersionTag,
	}

	_, err := releaseCollection.InsertOne(ctx, newRelease)
	if err != nil {
		responses.SendErrorResponse(c, &fiber.Map{"data": err.Error()})
	}

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
		ReferenceName: plumbing.ReferenceName("refs/heads/master"), // Need to add a custom branch name
		Progress:      os.Stdout,
		SingleBranch:  true,
	})
	if err != nil {
		responses.SendErrorResponse(c, &fiber.Map{"data": err.Error()})
	}

	startTime := time.Now()
	fmt.Println("📦⏳ Docker build start time: " + startTime.String())
	services.Build(service.ServiceName, newRelease.VersionTag, dir)
	endTime := time.Now()
	fmt.Println("📦⌛️ Docker build end time: " + endTime.String())
	buildDiff := endTime.Sub(startTime)
	fmt.Println("Build Time Difference: " + buildDiff.String())

	var registryLocation = "localhost:5000"
	var imageName = registryLocation + "/" + service.ServiceName + ":" + newRelease.VersionTag
	pushStartTime := time.Now()
	fmt.Println("⬆️⌛️ Docker push start time: " + pushStartTime.String())
	services.Push(imageName)
	pushEndTime := time.Now()
	fmt.Println("⬆️⌛️ Docker push end time: " + pushEndTime.String())
	pushDiff := pushEndTime.Sub(pushStartTime)
	fmt.Println("Push Time Difference: " + pushDiff.String())

	defer services.PruneContainers()
	defer services.PruneImages()

	responses.SendSuccessResponse(c, &fiber.Map{"data": newRelease})
	return nil
}
