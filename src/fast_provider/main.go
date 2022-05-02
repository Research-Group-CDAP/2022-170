package main

import (
	"fast-provider/configs"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Fast Provider Server")
	})

	configs.ConnectDB()

	app.Listen(":9000")
}
