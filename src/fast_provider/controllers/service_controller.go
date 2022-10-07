package controllers

import (
	"context"
	"fast-provider/configs"
	"fast-provider/models"
	"fast-provider/responses"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var serviceCollection *mongo.Collection = configs.GetCollections(configs.DB, "services")
var serviceValidate = validator.New()

func RegisterService(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var service models.Service
	defer cancel()

	if err := c.BodyParser(&service); err != nil {
		responses.SendBadRequestResponse(c, &fiber.Map{"info": err.Error()})
	}

	if validateErr := serviceValidate.Struct(&service); validateErr != nil {
		responses.SendBadRequestResponse(c, &fiber.Map{"data": validateErr.Error()})
	}

	// Get service documents
	cursor, err := serviceCollection.Find(ctx, bson.M{})
	if err != nil {
		responses.SendErrorResponse(c, &fiber.Map{"data": err.Error()})
	}

	var services []models.Service
	err = cursor.All(ctx, &services)
	if err != nil {
		responses.SendErrorResponse(c, &fiber.Map{"data": err.Error()})
	}

	repository := models.RepositoryInfo{
		Email:    service.Repository.Email,
		UserName: service.Repository.UserName,
		Password: service.Repository.Password,
		Link:     service.Repository.Link,
	}

	newService := models.Service{
		ServiceName:       service.ServiceName,
		Repository:        repository,
		ReferenceId:       uuid.New().String(),
		DefaultVersionTag: service.DefaultVersionTag,
		Status:            "New-Service",
		CreatedAt:         time.Now().UTC().Format("2006-01-02T15:04:05-0700"),
		UpdatedAt:         time.Now().UTC().Format("2006-01-02T15:04:05-0700"),
	}

	_, err = serviceCollection.InsertOne(ctx, newService)
	if err != nil {
		responses.SendErrorResponse(c, &fiber.Map{"data": err.Error()})
	}

	responses.SendSuccessResponse(c, &fiber.Map{"data": newService})
	return nil
}

func GetServices(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	opts := options.Find().SetProjection(bson.D{{Key: "repository.password", Value: 0}})

	cursor, err := serviceCollection.Find(ctx, bson.M{}, opts)
	if err != nil {
		responses.SendErrorResponse(c, &fiber.Map{"data": err.Error()})
	}

	var results []bson.M
	err = cursor.All(ctx, &results)
	if err != nil {
		responses.SendErrorResponse(c, &fiber.Map{"error_data": err.Error()})
	}

	responses.SendSuccessResponse(c, &fiber.Map{"services": results})
	return nil
}

func GetServiceById(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	service_id := c.Params("id")
	primitive_id, _ := primitive.ObjectIDFromHex(service_id)
	opts := options.FindOne().SetProjection(bson.D{{Key: "repository.password", Value: 0}})

	var results bson.M
	err := serviceCollection.FindOne(ctx, bson.M{"_id": primitive_id}, opts).Decode(&results)
	if err != nil {
		responses.SendErrorResponse(c, &fiber.Map{"data": err.Error()})
	}

	responses.SendSuccessResponse(c, &fiber.Map{"services": results})
	return nil
}
