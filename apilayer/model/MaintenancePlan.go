package model

import "time"

// Maintenance Plan ...
// swagger:model Maintenance plan
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
	MinItemsLimit     int       `json:"min_items_limit"`
	MaxItemsLimit     int       `json:"max_items_limit"`
	PlanType          string    `json:"plan_type"`
	Location          Location  `json:"location,omitempty"`
	CreatedBy         string    `json:"created_by"`
	CreatedAt         time.Time `json:"created_at"`
	Creator           string    `json:"creator"`
	UpdatedBy         string    `json:"updated_by"`
	UpdatedAt         time.Time `json:"updated_at"`
	Updator           string    `json:"updator"`
	SharableGroups    []string  `json:"sharable_groups"`
}
