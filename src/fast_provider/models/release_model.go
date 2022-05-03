package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Release struct {
	Id primitive.ObjectID `json:"id,omitempty"`
	ServiceId primitive.ObjectID `json:"serviceId,omitempty" validate:"required"`
	VersionTag string `json:"versionTag,omitempty" validate:"required"`
}