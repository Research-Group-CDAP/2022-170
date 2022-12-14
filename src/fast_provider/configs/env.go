package configs

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func EnvMongoURI() string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error with loading .env file")
	}

	return os.Getenv("MONGOURI")
}

func EnvMongoAtlasURI() string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error with loading .env file")
	}

	return os.Getenv("MONGO_ATLAS_URI")
}

func EnvLocalRegistryURI() string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error with loading .env file")
	}

	return os.Getenv("LOCAL_CONTAINER_REGISTRY_URL")
}
