package db

import (
	"database/sql"
	"errors"
	"log"
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"github.com/mohit2530/communityCare/model"
)

// RetrieveAllMaintenancePlans ...
func RetrieveAllMaintenancePlans(user string, userID string, limit int) ([]model.MaintenancePlan, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := `SELECT 
	mp.id,
	mp.name,
	mp.description,
	ms.id,
	ms.name AS status_name,
	ms.description AS status_description,
	mp.color, 
	mp.min_items_limit, 
	mp.max_items_limit,
	mp.plan_type,
	mp.location[0] AS lon,
	mp.location[1] AS lat,
	mp.created_at,
	mp.created_by,
	COALESCE(cp.full_name, cp.username, cp.email_address) AS creator_name, 
	mp.updated_at,
	mp.updated_by,
	COALESCE(up.full_name, up.username, up.email_address) AS updater_name,
	mp.sharable_groups
	FROM community.maintenance_plan mp
	LEFT JOIN community.maintenance_status ms on ms.id = mp.maintenance_status
	LEFT JOIN community.profiles cp on cp.id = mp.created_by
	LEFT JOIN community.profiles up on up.id = mp.updated_by
	WHERE $1::UUID = ANY(mp.sharable_groups)
	ORDER BY mp.updated_at DESC
	LIMIT $2;`

	rows, err := db.Query(sqlStr, userID, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var data []model.MaintenancePlan

	var lon, lat sql.NullFloat64
	var maintenancePlanID sql.NullString
	var sharableGroups pq.StringArray

	for rows.Next() {
		var ec model.MaintenancePlan
		if err := rows.Scan(&maintenancePlanID, &ec.Name, &ec.Description, &ec.Status, &ec.StatusName, &ec.StatusDescription,
			&ec.Color, &ec.MinItemsLimit, &ec.MaxItemsLimit, &ec.PlanType, &lon, &lat, &ec.CreatedAt, &ec.CreatedBy, &ec.Creator, &ec.UpdatedAt, &ec.UpdatedBy, &ec.Updator, &sharableGroups); err != nil {
			return nil, err
		}

		if lon.Valid && lat.Valid {
			ec.Location = model.Location{
				Lon: lon.Float64,
				Lat: lat.Float64,
			}
		}

		ec.ID = maintenancePlanID.String
		ec.SharableGroups = sharableGroups
		data = append(data, ec)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return data, nil
}

// CreateMaintenancePlan ...
func CreateMaintenancePlan(user string, draftMaintenancePlan *model.MaintenancePlan) (*model.MaintenancePlan, error) {
	db, err := SetupDB(user)
	if err != nil {
		log.Printf("failed to connect to the database: %v", err)
		return nil, err
	}
	defer db.Close()

	// Retrieve selected status
	retrieveStatusSqlStr := `SELECT id, name, description FROM community.maintenance_status s WHERE s.name=$2 AND $1::UUID = ANY(s.sharable_groups);`
	selectedStatusDetails, err := retrieveStatusDetails(user, draftMaintenancePlan.CreatedBy, draftMaintenancePlan.Status, retrieveStatusSqlStr)
	if err != nil {
		log.Printf("error retrieving status details: %v", err)
		return nil, err
	}
	if selectedStatusDetails == nil {
		return nil, errors.New("unable to find selected status")
	}

	parsedCreatorID, err := uuid.Parse(draftMaintenancePlan.CreatedBy)
	if err != nil {
		log.Printf("Error parsing creator id. Error: %+v", err)
		return nil, err
	}

	sqlStr := `INSERT INTO community.maintenance_plan(name, description, color, maintenance_status, min_items_limit, max_items_limit, 
	plan_type, location, created_by, created_at, updated_by, updated_at, sharable_groups)
	VALUES ($1, $2, $3, $4, $5, $6, $7, POINT($8, $9), $10, $11, $12, $13, $14)
	RETURNING id, name, description, color, maintenance_status, min_items_limit, max_items_limit, plan_type,
		created_at, created_by, updated_at, updated_by, sharable_groups;`

	tx, err := db.Begin()
	if err != nil {
		log.Printf("error starting transaction: %v", err)
		return nil, err
	}
	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	row := tx.QueryRow(
		sqlStr,
		draftMaintenancePlan.Name,
		draftMaintenancePlan.Description,
		draftMaintenancePlan.Color,
		selectedStatusDetails.ID,
		draftMaintenancePlan.MinItemsLimit,
		draftMaintenancePlan.MaxItemsLimit,
		draftMaintenancePlan.PlanType,
		draftMaintenancePlan.Location.Lon,
		draftMaintenancePlan.Location.Lat,
		parsedCreatorID,
		time.Now(),
		parsedCreatorID,
		time.Now(),
		pq.Array([]uuid.UUID{parsedCreatorID}),
	)

	err = row.Scan(
		&draftMaintenancePlan.ID,
		&draftMaintenancePlan.Name,
		&draftMaintenancePlan.Description,
		&draftMaintenancePlan.Color,
		&draftMaintenancePlan.Status,
		&draftMaintenancePlan.MinItemsLimit,
		&draftMaintenancePlan.MaxItemsLimit,
		&draftMaintenancePlan.PlanType,
		&draftMaintenancePlan.CreatedAt,
		&draftMaintenancePlan.CreatedBy,
		&draftMaintenancePlan.UpdatedAt,
		&draftMaintenancePlan.UpdatedBy,
		pq.Array(&draftMaintenancePlan.SharableGroups),
	)
	if err != nil {
		tx.Rollback()
		log.Printf("Error scanning result: %v", err)
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("Error committing transaction: %v", err)
		return nil, err
	}

	draftMaintenancePlan.StatusName = selectedStatusDetails.Name
	draftMaintenancePlan.StatusDescription = selectedStatusDetails.Description

	return draftMaintenancePlan, nil
}

// UpdateMaintenancePlan ...
func UpdateMaintenancePlan(user string, userID string, draftMaintenancePlan *model.MaintenancePlan) (*model.MaintenancePlan, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	// retrieve selected status
	retrieveStatusSqlStr := `SELECT id, name, description FROM community.maintenance_status s WHERE s.name=$2 AND $1::UUID = ANY(s.sharable_groups);`
	selectedStatusDetails, err := retrieveStatusDetails(user, userID, draftMaintenancePlan.Status, retrieveStatusSqlStr)
	if err != nil {
		return nil, err
	}
	if selectedStatusDetails == nil {
		return nil, errors.New("unable to find selected status")
	}

	sqlStr := `UPDATE community.maintenance_plan 
    SET 
    name = $2,
    description = $3,
	color = $4,
	maintenance_status = $5,
	min_items_limit = $6,
	max_items_limit = $7,
	plan_type = $8,
	location = POINT($9, $10),
    updated_by = $11,
    updated_at = $12
    WHERE id = $1
    RETURNING id, name, description, color, maintenance_status, min_items_limit, max_items_limit, plan_type, created_at, created_by, updated_at, updated_by, sharable_groups;
`
	tx, err := db.Begin()
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	parsedUpdatorID, err := uuid.Parse(draftMaintenancePlan.UpdatedBy)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	var updatedMaintenancePlan model.MaintenancePlan

	row := tx.QueryRow(sqlStr,
		draftMaintenancePlan.ID,
		draftMaintenancePlan.Name,
		draftMaintenancePlan.Description,
		draftMaintenancePlan.Color,
		selectedStatusDetails.ID,
		draftMaintenancePlan.MinItemsLimit,
		draftMaintenancePlan.MaxItemsLimit,
		draftMaintenancePlan.PlanType,
		draftMaintenancePlan.Location.Lon,
		draftMaintenancePlan.Location.Lat,
		parsedUpdatorID,
		time.Now(),
	)

	err = row.Scan(
		&updatedMaintenancePlan.ID,
		&updatedMaintenancePlan.Name,
		&updatedMaintenancePlan.Description,
		&updatedMaintenancePlan.Color,
		&updatedMaintenancePlan.Status,
		&updatedMaintenancePlan.MinItemsLimit,
		&updatedMaintenancePlan.MaxItemsLimit,
		&updatedMaintenancePlan.PlanType,
		&updatedMaintenancePlan.CreatedAt,
		&updatedMaintenancePlan.CreatedBy,
		&updatedMaintenancePlan.UpdatedAt,
		&updatedMaintenancePlan.UpdatedBy,
		pq.Array(&updatedMaintenancePlan.SharableGroups),
	)

	if err != nil {
		tx.Rollback()
		return nil, err
	}
	if err := tx.Commit(); err != nil {
		return nil, err
	}

	updatedMaintenancePlan.Status = selectedStatusDetails.ID.String()
	updatedMaintenancePlan.StatusName = selectedStatusDetails.Name
	updatedMaintenancePlan.StatusDescription = selectedStatusDetails.Description
	updatedMaintenancePlan.Location.Lat = draftMaintenancePlan.Location.Lat
	updatedMaintenancePlan.Location.Lon = draftMaintenancePlan.Location.Lon

	return &updatedMaintenancePlan, nil
}

// RemoveMaintenancePlan ...
func RemoveMaintenancePlan(user string, planID string) error {
	db, err := SetupDB(user)
	if err != nil {
		return err
	}
	defer db.Close()

	sqlStr := `DELETE FROM community.maintenance_plan WHERE id=$1`
	_, err = db.Exec(sqlStr, planID)
	if err != nil {
		log.Printf("unable to delete selected maintenance_plan. error: %+v", err)
		return err
	}
	return nil
}
