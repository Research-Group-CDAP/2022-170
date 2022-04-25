package main

import (
	"context"
	"fmt"

	"github.com/docker/docker/api/types"
	event "main.go/event/image"
)

func main() {
	ctx := context.Background()

	listErr := event.ListImages(ctx, types.ImageListOptions{})
	if listErr != nil {
		fmt.Println(listErr.Error())
		return
	}

	// err = event.Build(cli)
	// if err != nil {
	// 	fmt.Println(err.Error())
	// 	return
	// }
}
