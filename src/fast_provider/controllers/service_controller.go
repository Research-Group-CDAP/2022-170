package controllers

import (
	"context"
	"fast-provider/configs"
	"fast-provider/models"
	"fast-provider/responses"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var serviceCollection *mongo.Collection = configs.GetCollections(configs.DB, "services")
var serviceValidate = validator.New()

func RegisterService(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var service models.Service
	defer cancel()

	if err := c.BodyParser(&service); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ServiceResponse{
			Message: "Data is not valid", 
			Data: &fiber.Map{"data": err.Error()},
		})
	}

	if validateErr := serviceValidate.Struct(&service); validateErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ServiceResponse{
			Message: "Request body is not valid",
			Data: &fiber.Map{"data": validateErr.Error()},
		})
	}

	newService := models.Service{
		Id: primitive.NewObjectID(),
		ServiceName: service.ServiceName,
		RepositoryLink: service.RepositoryLink,
		UserName: service.UserName,
		Email: service.Email,
		Password: service.Email,
		ServiceReferenceId: uuid.New().String(),
		DefaultVersionTag: service.DefaultVersionTag,
	}

	_, err := serviceCollection.InsertOne(ctx, newService)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ServiceResponse{
			Message: "Fail to register the new service", 
			Data: &fiber.Map{"data": err.Error()},
		})
	}

	return c.Status(http.StatusCreated).JSON(responses.ServiceResponse{
		Message: "Service registration success", 
		Data: &fiber.Map{"data": newService},
	})
}

func GetServices(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := serviceCollection.Find(ctx, bson.M{})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ServiceResponse{
			Message: "Fail to fetch services", 
			Data: &fiber.Map{"data": err.Error()},
		})
	}

	var results []bson.M 
	err = cursor.All(ctx, &results)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ServiceResponse{
			Message: "Fail to structure the data", 
			Data: &fiber.Map{"data": err.Error()},
		})
	}

	return c.Status(http.StatusAccepted).JSON(responses.ServiceResponse{
		Message: "Registered services", 
		Data: &fiber.Map{"data": results},
	})
}