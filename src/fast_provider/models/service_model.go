package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Service struct {
	Id primitive.ObjectID `json:"id,omitempty"`
	ServiceName string `json:"serviceName,omitempty" validate:"required"`
	RepositoryLink string `json:"repositoryLink,omitempty" validate:"required"`
	UserName string `json:"userName,omitempty" validate:"required"`
	Email string `json:"email,omitempty" validate:"required"`
	Password string `json:"password,omitempty" validate:"required"`
	ServiceReferenceId string `json:"serviceReferenceId,omitempty"`
	DefaultVersionTag string `json:"defaultVersionTag,omitempty" validate:"required"`
}