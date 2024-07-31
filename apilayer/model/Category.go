package model

import "time"

// Category ...
// swagger:model Category
//
// Category instance to resemble a single category component
type Category struct {
	ID                  string    `json:"id"`
	CategoryName        string    `json:"category_name"`
	CategoryDescription string    `json:"category_description"`
	CreatedBy           string    `json:"created_by"`
	Created             time.Time `json:"created_at"`
	UpdatedBy           string    `json:"updated_by"`
	Updated             time.Time `json:"updated_at"`
	SharableGroups      []string  `json:"sharable_groups"`
}
