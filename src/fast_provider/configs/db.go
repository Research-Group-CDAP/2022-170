package configs

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDB() *mongo.Client {
	client, err := mongo.NewClient(options.Client().ApplyURI(EnvMongoURI()))
	if err != nil {
		log.Fatal(err)
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, nil) // send a ping request to the database
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("✨ Database Synced")
	return client
}

var DB *mongo.Client = ConnectDB()

func GetCollections(client *mongo.Client, collectionName string) *mongo.Collection {
	collection := client.Database("fastproviderdb").Collection(collectionName)
	return collection
}