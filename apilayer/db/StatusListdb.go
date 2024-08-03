package db

import (
	"github.com/lib/pq"
	"github.com/mohit2530/communityCare/model"
)

// FetchStatusList ...
func FetchStatusList(user string, userID string) ([]model.StatusList, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := `SELECT id, name, description, color, created_at, created_by, updated_at, updated_by, sharable_groups FROM community.statuses s WHERE $1::UUID = ANY(s.sharable_groups);`

	var statuses []model.StatusList
	var sharableGroups pq.StringArray
	rows, err := db.Query(sqlStr, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var statusList model.StatusList
		if err := rows.Scan(&statusList.ID, &statusList.Name, &statusList.Description, &statusList.Color, &statusList.CreatedAt, &statusList.CreatedBy, &statusList.UpdatedAt, &statusList.UpdatedBy, &sharableGroups); err != nil {
			return nil, err
		}
		statusList.SharableGroups = sharableGroups
		statuses = append(statuses, statusList)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return statuses, nil
}
