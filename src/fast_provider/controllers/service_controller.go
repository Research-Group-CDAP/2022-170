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

	cursor, err := serviceCollection.Find(ctx, bson.M{})
	if err != nil {
		responses.SendErrorResponse(c, &fiber.Map{"data": err.Error()})
	}

	var results []bson.M 
	err = cursor.All(ctx, &results)
	if err != nil {
		responses.SendErrorResponse(c, &fiber.Map{"data": err.Error()})
	}

	responses.SendSuccessResponse(c, &fiber.Map{"data": results})
	return nil
}