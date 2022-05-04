package controllers

import (
	"context"
	"fast-provider/configs"
	"fast-provider/models"
	"fast-provider/responses"
	"fast-provider/services"
	"io/ioutil"
	"net/http"
	"os"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"gopkg.in/src-d/go-git.v4"
)

var releaseCollection *mongo.Collection = configs.GetCollections(configs.DB, "releases")
var releaseValidate = validator.New()

func Release(c *fiber.Ctx) error {
	ctx, close := context.WithTimeout(context.Background(), 10*time.Second)
	var release models.Release
	defer close()

	if err := c.BodyParser(&release); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ServiceResponse{
			Message: "Data is not valid", 
			Data: &fiber.Map{"data": err.Error()},
		})
	}

	if validateErr := releaseValidate.Struct(&release); validateErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ServiceResponse{
			Message: "Request body is not valid",
			Data: &fiber.Map{"data": validateErr.Error()},
		})
	}

	newRelease := models.Release{
		Id: primitive.NewObjectID(),
		ServiceId: release.ServiceId,
		ServiceReferenceId: release.ServiceReferenceId,
		VersionTag: release.VersionTag,
	}

	_, err := releaseCollection.InsertOne(ctx, newRelease)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ServiceResponse{
			Message: "Fail to add new release information", 
			Data: &fiber.Map{"data": err.Error()},
		})
	}

	// Get service details
	var service models.Service
	err = serviceCollection.FindOne(ctx, bson.M{ "_id": newRelease.ServiceId }).Decode(&service)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ServiceResponse{
			Message: "Fail to get the service info", 
			Data: &fiber.Map{"data": err.Error()},
		})
	}

	// Clone the repository
	dir, err := ioutil.TempDir("controllers", "")
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ServiceResponse{ 
			Message: "Error with create temparary directory to clone the repository", 
			Data: &fiber.Map{"data": err.Error()},
		})
	}

	// defer os.RemoveAll(dir)

	_, err = git.PlainClone(dir, false, &git.CloneOptions{
		URL: service.RepositoryLink,
		RemoteName: "origin",
		// ReferenceName: "master", // Need to add a custom branch name
		Progress: os.Stdout,
		SingleBranch: true,
	})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ServiceResponse{ 
			Message: "Error with cloning the repository", 
			Data: &fiber.Map{"data": err.Error()},
		})
	}

	defer services.Build(service.ServiceName, newRelease.VersionTag, dir)
	

	return nil
}