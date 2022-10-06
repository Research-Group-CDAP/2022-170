package services

import (
	"context"
	"fmt"

	"github.com/docker/docker/api/types/filters"
	"github.com/docker/docker/client"
)

func PruneImages() (spaceReclaimed uint64, output string, err error) {
	ctx := context.Background()

	dockerClient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return 0, "", err
	}
	
	pruneFilters := filters.NewArgs()
	pruneFilters.Add("force", "true")
	pruneFilters.Add("dangling", "true")

	report, err := dockerClient.ImagesPrune(ctx, pruneFilters)
	
	if len(report.ImagesDeleted) > 0 {
		output = "Deleted Images:\n"
		for _, st := range report.ImagesDeleted {
			if st.Untagged != "" {
				output += fmt.Sprintln("untagged:", st.Untagged)
			} else {
				output += fmt.Sprintln("deleted:", st.Deleted)
			}
		}
		spaceReclaimed = report.SpaceReclaimed
	}

	return
}

func PruneContainers() (spaceReclaimed uint64, output string, err error) {
	ctx := context.Background()

	dockerClient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return 0, "", err
	}

	pruneFilters := filters.NewArgs()

	report, err := dockerClient.ContainersPrune(ctx, pruneFilters)
	

	if len(report.ContainersDeleted) > 0 {
		output = "Deleted Containers:\n"
		for _, st := range report.ContainersDeleted {
			if st != "" {
				output += fmt.Sprintln("untagged:", st)
			} else {
				output += fmt.Sprintln("deleted:", st)
			}
		}
		spaceReclaimed = report.SpaceReclaimed
	}

	return
}