package models

type RepositoryInfo struct {
	Email    string `bson:"email,omitempty"`
	UserName string `bson:"user_name,omitempty"`
	Password string `bson:"password,omitempty"`
	Link     string `bson:"link,omitempty"`
}

type Service struct {
	ServiceName       string         `bson:"service_name,omitempty"`
	Repository        RepositoryInfo `bson:"repository,omitempty"`
	ReferenceId       string         `bson:"reference_id,omitempty"`
	DefaultVersionTag string         `bson:"default_version_tag,omitempty"`
	Status            string         `bson:"status"`
	Versions          []string       `bson:"versions,omitempty"`
	CreatedAt         string         `bson:"created_at,omitempty"`
	UpdatedAt         string         `bson:"updated_at,omitempty"`
	DeletedAt         string         `bson:"deleted_at,omitempty"`
}
