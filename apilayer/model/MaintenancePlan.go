package model

import "time"

// MaintenancePlan ...
// swagger:model MaintenancePlan
//
// Maintenance plan instance to resemble a single maintenance plan
type MaintenancePlan struct {
	ID                string    `json:"id"`
	Name              string    `json:"name"`
	Description       string    `json:"description"`
	Color             string    `json:"color"`
	Status            string    `json:"maintenance_status"`
	StatusName        string    `json:"maintenance_status_name"`
	StatusDescription string    `json:"maintenance_status_description"`
	PlanType          string    `json:"plan_type"`
	PlanDue           time.Time `json:"plan_due"`
	Location          Location  `json:"location,omitempty"`
	CreatedBy         string    `json:"created_by"`
	CreatedAt         time.Time `json:"created_at"`
	Creator           string    `json:"creator"`
	UpdatedBy         string    `json:"updated_by"`
	UpdatedAt         time.Time `json:"updated_at"`
	Updator           string    `json:"updator"`
	SharableGroups    []string  `json:"sharable_groups"`
	Image             []byte    `json:"image,omitempty"`
}

// MaintenanceItemRequest ...
// swagger:model MaintenanceItemRequest
//
// MaintenanceItemRequest instance to resemble list of assets that can be added to a maintenance plan item
type MaintenanceItemRequest struct {
	ID            string   `json:"id"`
	UserID        string   `json:"userID"`
	AssetIDs      []string `json:"assetIDs"`
	Collaborators []string `json:"collaborators"`
}

// MaintenanceItemResponse ...
// swagger:model MaintenanceItemResponse
//
// MaintenanceItemResponse instance to resemble list of assets that are associated with a maintenance plan item
type MaintenanceItemResponse struct {
	ID                string    `json:"id"`
	MaintenancePlanID string    `json:"plan_id"`
	ItemID            string    `json:"item_id"`
	Name              string    `json:"name"`
	Description       string    `json:"description"`
	Price             string    `json:"price"`
	Quantity          string    `json:"quantity"`
	Location          string    `json:"location"`
	CreatedBy         string    `json:"created_by"`
	CreatedAt         time.Time `json:"created_at"`
	Creator           string    `json:"creator"`
	UpdatedBy         string    `json:"updated_by"`
	UpdatedAt         time.Time `json:"updated_at"`
	Updator           string    `json:"updator"`
	SharableGroups    []string  `json:"sharable_groups"`
}
