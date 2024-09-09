package model

import (
	"time"

	"github.com/google/uuid"
)

// RecentActivity ...
// swagger:model RecentActivity
//
// RecentActivity object that contains the recent activity of the user
type RecentActivity struct {
	ID             uuid.UUID `json:"id"`
	ActivityID     string    `json:"activity_id"`
	Type           string    `json:"type"`
	Title          string    `json:"title"`
	CustomAction   string    `json:"custom_action"`
	CreatedAt      time.Time `json:"created_at,omitempty"`
	CreatedBy      string    `json:"created_by,omitempty"`
	Creator        string    `json:"creator,omitempty"`
	UpdatedAt      time.Time `json:"updated_at,omitempty"`
	UpdatedBy      string    `json:"updated_by,omitempty"`
	Updator        string    `json:"updator,omitempty"`
	SharableGroups []string  `json:"sharable_groups"`
}
