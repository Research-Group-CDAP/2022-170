package services

import (
	"bufio"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/docker/docker/pkg/archive"
)

func Build(serviceName string, tag string, srcPath string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	dockerClient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return err
	}

	tar, err := archive.TarWithOptions(srcPath, &archive.TarOptions{})
	if err != nil {
		return err
	}

	// var localRegistryURL = "localhost:5000"
	buildOptions := types.ImageBuildOptions{
		Dockerfile: "Dockerfile",
		// Labels: map[string]string{"test": "test"},
		// Tags: []string{"test"}, // tag the docker image that need to push the local container registry
		Remove: true,
	}

	res, err := dockerClient.ImageBuild(ctx, tar, buildOptions)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	err = print(res.Body)
	if err != nil {
		return err
	}

	return nil
}

type ErrorLine struct {
	Error       string      `json:"error"`
	ErrorDetail ErrorDetail `json:"errorDetail"`
}

type ErrorDetail struct {
	Message string `json:"message"`
}

func print(rd io.Reader) error {
	var lastLine string

	scanner := bufio.NewScanner(rd)
	for scanner.Scan() {
		lastLine = scanner.Text()
		fmt.Println(scanner.Text())
	}

	errLine := &ErrorLine{}
	json.Unmarshal([]byte(lastLine), errLine)
	if errLine.Error != "" {
		return errors.New(errLine.Error)
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	return nil
}