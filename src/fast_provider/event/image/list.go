package event

import (
	"context"
	"fmt"
	"os"
	"strconv"
	"text/tabwriter"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

func ListImages(ctx context.Context, opt types.ImageListOptions) error {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return err
	}

	images, err := cli.ImageList(ctx, opt)
	if err != nil {
		return err
	}

	writer := tabwriter.NewWriter(os.Stdout, 0, 8, 1, '\t', tabwriter.AlignRight)
	fmt.Fprintln(writer, "IMAGE\tSIZE")
	for _, image := range images {
		fmt.Fprintln(writer, image.RepoTags[0]+"\t"+strconv.FormatInt(image.Size, 10))
		writer.Flush()
	}
	return nil
}
