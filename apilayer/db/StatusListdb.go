package db

import (
	"database/sql"
	"fmt"

	"github.com/lib/pq"
	"github.com/mohit2530/communityCare/model"
)

// FetchStatusList ...
func FetchStatusList(user string, userID string, statusOptionType string) ([]model.StatusList, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	tableName := ""
	if statusOptionType == "maintenance" {
		tableName = "community.maintenance_status"
	} else if statusOptionType == "notes" || statusOptionType == "category" {
		tableName = "community.statuses"
	}

	sqlStr := fmt.Sprintf("SELECT id, name, description, color, created_at, created_by, updated_at, updated_by, sharable_groups FROM %s WHERE $1::UUID = ANY(sharable_groups);", tableName)

	var statuses []model.StatusList
	var color sql.NullString
	var sharableGroups pq.StringArray
	rows, err := db.Query(sqlStr, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var statusList model.StatusList
		if err := rows.Scan(&statusList.ID, &statusList.Name, &statusList.Description, &color, &statusList.CreatedAt, &statusList.CreatedBy, &statusList.UpdatedAt, &statusList.UpdatedBy, &sharableGroups); err != nil {
			return nil, err
		}
		if color.Valid {
			statusList.Color = color.String
		}
		statusList.SharableGroups = sharableGroups
		statuses = append(statuses, statusList)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return statuses, nil
}
