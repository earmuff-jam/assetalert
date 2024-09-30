package model

import "time"

// Report ...
// swagger:model Report
//
// Report object
type Report struct {
	ID                     string    `json:"id"`
	SelectedTimeRange      time.Time `json:"selected_time_range"`
	ItemValuation          float64   `json:"total_valuation"`
	TotalCategoryItemsCost float64   `json:"cost_category_items"`
	CreatedAt              time.Time `json:"created_at"`
	CreatedBy              string    `json:"created_by"`
	CreatorName            string    `json:"creator_name"`
	UpdatedAt              time.Time `json:"updated_at"`
	UpdatedBy              string    `json:"updated_by"`
	UpdaterName            string    `json:"updater_name"`
	SharableGroups         []string  `json:"sharable_groups"`
}
