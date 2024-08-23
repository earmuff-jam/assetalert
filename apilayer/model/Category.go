package model

import "time"

// Category ...
// swagger:model Category
//
// Category instance to resemble a single category component
type Category struct {
	ID                string    `json:"id"`
	Name              string    `json:"name"`
	Description       string    `json:"description"`
	Color             string    `json:"color"`
	Status            string    `json:"status"`
	StatusName        string    `json:"status_name"`
	StatusDescription string    `json:"status_description"`
	MinItemsLimit     int       `json:"min_items_limit"`
	MaxItemsLimit     int       `json:"max_items_limit"`
	CreatedBy         string    `json:"created_by"`
	CreatedAt         time.Time `json:"created_at"`
	Creator           string    `json:"creator"`
	UpdatedBy         string    `json:"updated_by"`
	UpdatedAt         time.Time `json:"updated_at"`
	Updator           string    `json:"updator"`
	SharableGroups    []string  `json:"sharable_groups"`
}

type CategoryItem struct {
	ID             string    `json:"id"`
	CategoryID     string    `json:"category_id"`
	CreatedBy      string    `json:"created_by"`
	CreatedAt      time.Time `json:"created_at"`
	Creator        string    `json:"creator"`
	UpdatedBy      string    `json:"updated_by"`
	UpdatedAt      time.Time `json:"updated_at"`
	Updator        string    `json:"updator"`
	SharableGroups []string  `json:"sharable_groups"`
}
