package services

import (
	"context"
	"io"
	"log"
	"os"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/docker/docker/pkg/archive"
	"github.com/mitchellh/go-homedir"
)

func Build(serviceName string, tag string, srcPath string) error {
	ctx := context.Background()

	dockerClient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return err
	}

	tar, err := archive.TarWithOptions(srcPath, &archive.TarOptions{})
	if err != nil {
		return err
	}

	var localRegistryURL = "fastregistrytest.azurecr.io"
	buildOptions := types.ImageBuildOptions{
		Dockerfile: "Dockerfile",
		Tags:       []string{localRegistryURL + "/" + serviceName + ":" + tag},
	}

	res, err := dockerClient.ImageBuild(ctx, tar, buildOptions)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	_, err = io.Copy(os.Stdout, res.Body)
	if err != nil {
		log.Fatal(err, " :unable to read image build response")
	}

	return nil
}

func GetContext(filePath string) io.Reader {
	filePath, _ = homedir.Expand(filePath)
	ctx, _ := archive.TarWithOptions(filePath, &archive.TarOptions{})
	return ctx
}
