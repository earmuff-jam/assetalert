package model

import "github.com/google/uuid"

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
