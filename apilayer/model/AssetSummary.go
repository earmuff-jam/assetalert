package model

import "time"

// AssetSummary ...
// swagger:model AssetSummary
//
// AssetSummary instance to resemble a single assetSummary
type AssetSummary struct {
	ID             string    `json:"id"`
	Name           string    `json:"name"`
	Type           string    `json:"type"`
	ReturnTime     time.Time `json:"returntime"`
	Price          float64   `json:"price"`
	CategoryID     string    `json:"category_id"`
	PlanID         string    `json:"plan_id"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
	SharableGroups []string  `json:"sharable_groups"`
}
