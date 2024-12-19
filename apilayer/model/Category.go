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
	Location          Location  `json:"location,omitempty"`
	Image             []byte    `json:"image,omitempty"`
	CreatedBy         string    `json:"created_by"`
	CreatedAt         time.Time `json:"created_at"`
	Creator           string    `json:"creator"`
	UpdatedBy         string    `json:"updated_by"`
	UpdatedAt         time.Time `json:"updated_at"`
	Updator           string    `json:"updator"`
	SharableGroups    []string  `json:"sharable_groups"`
}

// CategoryItem ...
// swagger:model CategoryItem
//
// CategoryItem instance to resemble a category and item combination
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

// CategoryItemRequest ...
// swagger:model CategoryItemRequest
//
// CategoryItemRequest instance to resemble list of assets that can be added to a category
type CategoryItemRequest struct {
	ID            string   `json:"id"`
	UserID        string   `json:"userID"`
	AssetIDs      []string `json:"assetIDs"`
	Collaborators []string `json:"collaborators"`
}

// CategoryItemResponse ...
// swagger:model CategoryItemResponse
//
// CategoryItemResponse instance to resemble list of assets that are associated with a category
type CategoryItemResponse struct {
	ID             string    `json:"id"`
	CategoryID     string    `json:"category_id"`
	ItemID         string    `json:"item_id"`
	Name           string    `json:"name"`
	Description    string    `json:"description"`
	Price          string    `json:"price"`
	Quantity       string    `json:"quantity"`
	Location       string    `json:"location"`
	CreatedBy      string    `json:"created_by"`
	CreatedAt      time.Time `json:"created_at"`
	Creator        string    `json:"creator"`
	UpdatedBy      string    `json:"updated_by"`
	UpdatedAt      time.Time `json:"updated_at"`
	Updator        string    `json:"updator"`
	SharableGroups []string  `json:"sharable_groups"`
}
