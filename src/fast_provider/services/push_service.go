package services

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"io"
	"os"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

func Push(image string) error {
	ctx := context.Background()

	var authConfig = types.AuthConfig{
		ServerAddress: "fastregistrytest.azurecr.io",
		Username:      "fastregistrytest",
		Password:      "7rO6jasprYa0B5eQC5/KseSmHe+l5aRq",
	}
	authConfigBytes, _ := json.Marshal(authConfig)
	authConfigEncoded := base64.URLEncoding.EncodeToString(authConfigBytes)

	dockerClient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return err
	}

	pushOptions := types.ImagePushOptions{
		RegistryAuth: authConfigEncoded,
	}

	pusher, err := dockerClient.ImagePush(ctx, image, pushOptions)
	if err != nil {
		return err
	}

	defer pusher.Close()
	io.Copy(os.Stdout, pusher)
	return nil
}
