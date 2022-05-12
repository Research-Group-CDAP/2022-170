package main

import (
	"fast-provider/configs"
	"fast-provider/routes"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Fast Provider Server")
	})

	// Inject service routes
	routes.ServiceRoutes(app)

	// Inject release routes
	routes.ReleaseRoutes(app)
	
	configs.ConnectDB()
	fmt.Println("✨ Database Synced")
	
	app.Listen(":9000")
}
