package services

import (
	"archive/tar"
	"bufio"
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

func Build(serviceName string, tag string, srcPath string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	dockerClient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return err
	}

	buf := new(bytes.Buffer)
	tw := tar.NewWriter(buf)
	defer tw.Close()

	fmt.Print(srcPath)
	dockerFileReader, err := os.Open("Dockerfile")
	if err != nil {
		return err
	}


	readDockerfile, err := ioutil.ReadAll(dockerFileReader)
	if err != nil {
		return err
	}

	tarHeader := &tar.Header{
		Name: "Dockerfile",
		Size: int64(len(readDockerfile)),
	}

	err = tw.WriteHeader(tarHeader) // Write header to tar file
	if err != nil {
		return err
	}

	_, err = tw.Write(readDockerfile) // Write dockerfile data into TAR file
	if err != nil {
		return err
	}

	dockerFileTarReader := bytes.NewReader(buf.Bytes())

	var localRegistryURL = "localhost:5000"
	buildOptions := types.ImageBuildOptions{
		Context: dockerFileTarReader,
		Dockerfile: "Dockerfile",
		Tags: []string{localRegistryURL + "/" + serviceName + ":" + tag}, // tag the docker image that need to push the local container registry
		Remove: true,
	}

	res, err := dockerClient.ImageBuild(ctx, dockerFileTarReader, buildOptions)
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