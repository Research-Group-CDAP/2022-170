package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type BuildInfo struct {
	BuildStartTime         string `bson:"build_start_time,omitempty"`
	BuildEndTime           string `bson:"build_end_time,omitempty"`
	LocalRepoPushStartTime string `bson:"local_repo_push_start_time,omitempty"`
	LocalRepoPushEndTime   string `bson:"local_repo_push_end_time,omitempty"`
}

type Release struct {
	ServiceId       primitive.ObjectID `bson:"service_id,omitempty" validate:"required"`
	VersionTag      string             `bson:"version_tag,omitempty" validate:"required"`
	BranchName      string             `bson:"branch_name,omitempty"`
	ReleaseDate     string             `bson:"release_date,omitempty"`
	ReleaseTime     string             `bson:"relase_time,omitempty"`
	BuildMetaData   BuildInfo          `bson:"build_meta_data,omitempty"`
	Status          string             `bson:"status,omitempty"`
	MoreInformation string             `bson:"more_information,omitempty"`
}
