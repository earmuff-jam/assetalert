package model

import (
	"time"

	"github.com/google/uuid"
)

// StatusList ...
// swagger:model StatusList
//
// StatusList object. Model for list of statuses
type StatusList struct {
	ID             uuid.UUID `json:"id,omitempty"`
	Name           string    `json:"name,omitempty"`
	Description    string    `json:"description,omitempty"`
	Color          string    `json:"color"`
	CreatedAt      time.Time `json:"created_at"`
	CreatedBy      string    `json:"created_by"`
	CreatorName    string    `json:"creator_name"`
	UpdatedAt      time.Time `json:"updated_at"`
	UpdatedBy      string    `json:"updated_by"`
	UpdaterName    string    `json:"updater_name"`
	SharableGroups []string  `json:"sharable_groups"`
}
