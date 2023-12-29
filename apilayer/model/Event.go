package model

import "time"

// Event ...
type Event struct {
	ID                string    `json:"id"`
	Title             string    `json:"title"`
	Description       string    `json:"description"`
	Cause             string    `json:"cause"`
	ImageURL          string    `json:"image_url"`
	Street            string    `json:"street"`
	City              string    `json:"city"`
	State             string    `json:"state"`
	ZipCode           string    `json:"zip"`
	BoundingBox       []string  `json:"boundingbox"`
	Class             string    `json:"class"`
	DisplayName       string    `json:"display_name"`
	Importance        string    `json:"importance"`
	Lattitude         string    `json:"lat"`
	License           string    `json:"license"`
	Longitude         string    `json:"lon"`
	OsmID             string    `json:"text"`
	OsmType           string    `json:"osm_type"`
	PlaceID           string    `json:"place_id"`
	PoweredBy         string    `json:"powered_by"`
	Type              string    `json:"type"`
	ProjectType       string    `json:"project_type"`
	ProjectSkills     []string  `json:"skills_required"`
	Comments          string    `json:"comments"`
	RegistrationLink  string    `json:"registration_link"`
	MaxAttendees      int       `json:"max_attendees"`
	Attendees         []string  `json:"attendees"`
	TotalManHours     int       `json:"required_total_man_hours"`
	IsActivated       bool      `json:"is_activated"`
	DeactivatedReason string    `json:"deactivated_reason"`
	StartDate         time.Time `json:"start_date"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"updated_at"`
	CreatedBy         string    `json:"created_by"`
	CreatorName       string    `json:"creator_name"`
	UpdatedBy         string    `json:"updated_by"`
	UpdatorName       string    `json:"updator_name"`
	SharableGroups    []string  `json:"sharable_groups"`
}

// VolunteeringDetails ...
type VolunteeringDetails struct {
	ID                   string    `json:"id"`
	UserID               string    `json:"userID"`
	EventID              string    `json:"eventID"`
	Title                string    `json:"title"`
	EventSkillsID        string    `json:"project_skills_id"`
	VolunteeringActivity string    `json:"volunteeringActivity"`
	Hours                string    `json:"volunteer_hours"`
	CreatedAt            time.Time `json:"created_at"`
	CreatedBy            string    `json:"created_by"`
	UpdatedAt            time.Time `json:"updated_at"`
	UpdatedBy            string    `json:"updated_by"`
}

// ReportEvent ...
type ReportEvent struct {
	ID             string    `json:"id"` // same as eventID. Report ID is hidden for clients
	Subject        string    `json:"subject"`
	Description    string    `json:"description"`
	EventLocation  string    `json:"event_location"`
	OrganizerName  string    `json:"organizer_name"`
	EventID        string    `json:"event_id"`
	CreatedAt      time.Time `json:"created_at"`
	CreatedBy      string    `json:"created_by"`
	CreatorName    string    `json:"creator_name,omitempty"`
	UpdatedAt      time.Time `json:"updated_at"`
	UpdatedBy      string    `json:"updated_by"`
	UpdatorName    string    `json:"updator_name,omitempty"`
	SharableGroups []string  `json:"sharable_groups"`
}

// State ...
type State struct {
	ID           string `json:"id"`
	Name         string `json:"name"`
	Abbreviation string `json:"abbreviation"`
}

// EventCause ...
type EventCause struct {
	ID    string `json:"id"`
	Cause string `json:"cause"`
}

// ProjectType ...
type ProjectType struct {
	ID   string `json:"id"`
	Type string `json:"type"`
}

// ItemToUpdate ...
type ItemToUpdate struct {
	Column  string `json:"column"`
	Value   string `json:"value"`
	EventID string `json:"eventID"`
	ItemID  string `json:"itemID"`
	UserID  string `json:"userID"`
}

// Item ...
type Item struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	EventID     string    `json:"eventID"`
	Description string    `json:"description"`
	Quantity    int       `json:"quantity"`
	UnitPrice   float64   `json:"unit_price,omitempty"`
	BoughtAt    string    `json:"bought_at,omitempty"`
	LocationID  string    `json:"storage_location_id,omitempty"`
	Location    string    `json:"location"`
	CreatedBy   string    `json:"created_by"`
	CreatorName string    `json:"creator_name,omitempty"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedBy   string    `json:"updated_by"`
	UpdaterName string    `json:"updater_name,omitempty"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// StorageLocation ...
type StorageLocation struct {
	ID             string    `json:"id"`
	Location       string    `json:"location"`
	CreatedBy      string    `json:"created_by"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedBy      string    `json:"updated_by"`
	UpdatedAt      time.Time `json:"updated_at"`
	SharableGroups []string  `json:"sharable_groups"`
}
