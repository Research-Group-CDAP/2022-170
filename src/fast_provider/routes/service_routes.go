package routes

import (
	"fast-provider/controllers"

	"github.com/gofiber/fiber/v2"
)

func ServiceRoutes(app *fiber.App) {
	app.Post("/service/", controllers.RegisterService)
}