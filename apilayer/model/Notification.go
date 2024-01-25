package model

import "time"

// Notification ...
type Notification struct {
	ID          string    `json:"id"`
	EventID     string    `json:"event_id"`
	Title       string    `json:"title"`
	IsViewed    bool      `json:"is_viewed"`
	IsResolved  bool      `json:"is_resolved"`
	CreatedAt   time.Time `json:"created_at"`
	CreatedBy   string    `json:"created_by"`
	CreatorName string    `json:"creator_name"`
	UpdatedAt   time.Time `json:"updated_at"`
	UpdatedBy   string    `json:"updated_by"`
	UpdaterName string    `json:"updater_name"`
}
