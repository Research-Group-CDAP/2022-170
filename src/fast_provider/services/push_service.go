package services

import (
	"context"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

func Push(image string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	dockerClient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return err
	}

	pushOptions := types.ImagePushOptions{}

	closer, err := dockerClient.ImagePush(ctx, image, pushOptions)
	if err != nil {
		return err
	}

	closer.Close()
	return nil
}