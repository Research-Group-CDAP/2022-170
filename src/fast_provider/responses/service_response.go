package responses

import "github.com/gofiber/fiber/v2"

type ServiceResponse struct {
	Status int `json:"status"`
	Message string `json:"message"`
	Data *fiber.Map `json:"Data"`
}