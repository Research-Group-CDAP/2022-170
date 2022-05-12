package routes

import (
	"fast-provider/controllers"

	"github.com/gofiber/fiber/v2"
)

func ReleaseRoutes(app *fiber.App) {
	app.Post("/release/add", controllers.Release)
}