package db

import (
	"database/sql"
	"errors"
	"log"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"github.com/mohit2530/communityCare/model"
)

// RetrieveStatusDetails ...
func RetrieveStatusDetails(user string, creatorID string, statusID string) (*model.StatusList, error) {

	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := `SELECT id, name, description FROM community.statuses s WHERE s.name=$2 AND $1::UUID = ANY(s.sharable_groups);`
	row := db.QueryRow(sqlStr, creatorID, statusID)

	var selectedStatusID, selectedStatusName, selectedStatusDescription string
	err = row.Scan(&selectedStatusID, &selectedStatusName, &selectedStatusDescription)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, errors.New("unable to find selected status")
		}
		log.Printf("invalid status selected. error: %+v", err)
		return nil, err
	}

	parsedSelectedStatusID, err := uuid.Parse(selectedStatusID)
	if err != nil {
		log.Printf("error in parsing selected status. error: %+v", err)
		return nil, err
	}

	selectedStatus := model.StatusList{
		ID:          parsedSelectedStatusID,
		Name:        selectedStatusName,
		Description: selectedStatusDescription,
	}

	return &selectedStatus, nil
}

// MaintenanceStatusList ...
func MaintenanceStatusList(user string, userID string, statusOptionType string) ([]model.StatusList, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := "SELECT id, name, description, color, created_at, created_by, updated_at, updated_by, sharable_groups FROM community.statuses WHERE $1::UUID = ANY(sharable_groups);"

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
