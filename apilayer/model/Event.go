package model

import "time"

// Event ...
// swagger:model Event
//
// List of the events
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
	Deactivated       bool      `json:"deactivated"`
	DeactivatedReason string    `json:"deactivated_reason"`
	StartDate         time.Time `json:"start_date"`
	Price             float64   `json:"price,omitempty"`
	Collaborators     []string  `json:"collaborators"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"updated_at"`
	CreatedBy         string    `json:"created_by"`
	CreatorName       string    `json:"creator_name"`
	UpdatedBy         string    `json:"updated_by"`
	UpdatorName       string    `json:"updator_name"`
	SharableGroups    []string  `json:"sharable_groups"`
}

// VolunteeringDetails ...
// swagger:model VolunteeringDetails
//
// List of volunteering details
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
// swagger:model ReportEvent
//
// Report made against any selected event.
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

// Expense ...
// swagger:model Expense
//
// Expense made for each item. These items are bought for the selected event.
type Expense struct {
	ID               string    `json:"id"`
	EventID          string    `json:"eventID"`
	ItemName         string    `json:"item_name"`
	ItemCost         string    `json:"item_cost"`
	CategoryID       string    `json:"category_id"`
	Category         string    `json:"category_name"`
	PurchaseLocation string    `json:"purchase_location"`
	Notes            string    `json:"notes"`
	CreatedAt        time.Time `json:"created_at"`
	CreatedBy        string    `json:"created_by"`
	CreatorName      string    `json:"creator_name,omitempty"`
	UpdatedAt        time.Time `json:"updated_at"`
	UpdatedBy        string    `json:"updated_by"`
	UpdatorName      string    `json:"updator_name,omitempty"`
	SharableGroups   []string  `json:"sharable_groups"`
}

// State ...
// swagger:model State
//
// The current states of United States are displayed here.
type State struct {
	ID           string `json:"id"`
	Name         string `json:"name"`
	Abbreviation string `json:"abbreviation"`
}

// EventCause ...
// swagger:model EventCause
//
// EventCause are the cause that the selected event is associated with. Only one event can be associated with one event cause.
type EventCause struct {
	ID    string `json:"id"`
	Cause string `json:"cause"`
}

// ProjectType ...
// swagger:model ProjectType
//
// ProjectType are the types of project that the selected event can be associated with. Only one event can be of a specific type.
type ProjectType struct {
	ID   string `json:"id"`
	Type string `json:"type"`
}

// ItemToUpdate ...
// swagger:model ItemToUpdate
//
// ItemToUpdate is the object that needs to be updated when the client is updating the item list of a selected event. A user can update a certain limit of columns
type ItemToUpdate struct {
	Column  string `json:"column"`
	Value   string `json:"value"`
	EventID string `json:"eventID"`
	ItemID  string `json:"itemID"`
	UserID  string `json:"userID"`
}

// Item ...
// swagger:model Item
//
// Each selected item is the item that clients add to the selected event.
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
// swagger:model StorageLocation
//
// Storage Location is the location where the item has been stored
type StorageLocation struct {
	ID             string    `json:"id"`
	Location       string    `json:"location"`
	CreatedBy      string    `json:"created_by"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedBy      string    `json:"updated_by"`
	UpdatedAt      time.Time `json:"updated_at"`
	SharableGroups []string  `json:"sharable_groups"`
}

// Category ...
// swagger:model Category
//
// These are the list of categories for each item. Items that are added can be categorized into certain values based on characteristics.
type Category struct {
	ID             string    `json:"id"`
	CategoryName   string    `json:"category_name"`
	CreatedBy      string    `json:"created_by"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedBy      string    `json:"updated_by"`
	UpdatedAt      time.Time `json:"updated_at"`
	SharableGroups []string  `json:"sharable_groups"`
}
