package routes

import (
	"fast-provider/controllers"

	"github.com/gofiber/fiber/v2"
)

func ServiceRoutes(app *fiber.App) {
	app.Post("/service/", controllers.RegisterService)
	app.Get("/service/", controllers.GetServices)
}