package model

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

// Profile ...
type Profile struct {
	ID           uuid.UUID `json:"id"`
	Username     string    `json:"username"`
	FullName     string    `json:"full_name"`
	AvatarUrl    string    `json:"avatar_url,omitempty"`
	EmailAddress string    `json:"email_address"`
	PhoneNumber  string    `json:"phone_number"`
	Goal         string    `json:"goal"`
	AboutMe      string    `json:"about_me"`
	OnlineStatus bool      `json:"online_status"`
	Role         string    `json:"role"`
}

// Validate ...
//
// used to validate the profile fields
func (p *Profile) Validate() error {
	if len(p.Username) == 0 || len(p.FullName) == 0 || len(p.EmailAddress) == 0 || len(p.PhoneNumber) == 0 {
		return errors.New("empty required field")
	}
	return nil
}

// RecentActivity ...
type RecentActivity struct {
	Type              string    `json:"type"`
	EventID           string    `json:"id"`
	Title             string    `json:"title"`
	ExpenseID         string    `json:"expenseID"`
	ExpenseName       []string  `json:"expense_name"`
	ExpenseAmount     string    `json:"expense_amount"`
	VolunteeringID    string    `json:"volunteering_id"`
	VolunteeringSkill []string  `json:"volunteering_skill"`
	VolunteeringHours string    `json:"volunteering_hours"`
	UpdatedAt         time.Time `json:"updated_at"`
}
