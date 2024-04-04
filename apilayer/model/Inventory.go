package model

import "time"

type Inventory struct {
	ID                string    `json:"id"`
	Name              string    `json:"name"`
	Description       string    `json:"description"`
	Price             string    `json:"price"`
	Status            string    `json:"status"`
	Barcode           string    `json:"barcode"`
	SKU               string    `json:"sku"`
	Quantity          int       `json:"quantity"`
	Location          string    `json:"location"`
	StorageLocationID string    `json:"storage_location_id"`
	IsResolved        bool      `json:"is_resolved"`
	CreatedAt         time.Time `json:"created_at"`
	CreatedBy         string    `json:"created_by"`
	CreatorName       string    `json:"creator_name"`
	UpdatedAt         time.Time `json:"updated_at"`
	UpdatedBy         string    `json:"updated_by"`
	UpdaterName       string    `json:"updater_name"`
	BoughtAt          string    `json:"bought_at"`
}

// InventoryItemToUpdate ...
// swagger:model InventoryItemToUpdate
//
// InventoryItemToUpdate is the object that needs to be updated when the client is updating the inventory list of their own personal account. A user can update a certain limit of columns
type InventoryItemToUpdate struct {
	Column string `json:"column"`
	Value  string `json:"value"`
	ID     string `json:"id"`
	UserID string `json:"userID"`
}
