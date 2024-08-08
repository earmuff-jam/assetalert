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

// RetrieveAllCategories ...
func RetrieveAllCategories(user string, userID string, limit int) ([]model.Category, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := `SELECT 
	c.id,
	c.name,
	c.description,
	s.id,
	s.name AS status_name,
	s.description AS status_description,
	c.color, 
	c.min_items_limit, 
	c.max_items_limit, 
	c.created_at,
	c.created_by,
	COALESCE(cp.full_name, cp.username, cp.email_address) AS creator_name, 
	c.updated_at,
	c.updated_by,
	COALESCE(up.full_name, up.username, up.email_address)  AS updater_name,
	c.sharable_groups
	FROM community.category c
	LEFT JOIN community.statuses s on s.id = c.status
	LEFT JOIN community.profiles cp on cp.id = c.created_by
	LEFT JOIN community.profiles up on up.id = c.updated_by
	WHERE $1::UUID = ANY(c.sharable_groups)
	ORDER BY c.updated_at DESC
	LIMIT $2;`

	rows, err := db.Query(sqlStr, userID, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var data []model.Category

	var categoryID sql.NullString
	var sharableGroups pq.StringArray

	for rows.Next() {
		var ec model.Category
		if err := rows.Scan(&categoryID, &ec.Name, &ec.Description, &ec.Status, &ec.StatusName, &ec.StatusDescription,
			&ec.Color, &ec.MinItemsLimit, &ec.MaxItemsLimit, &ec.CreatedAt, &ec.CreatedBy, &ec.Creator, &ec.UpdatedAt, &ec.UpdatedBy, &ec.Updator, &sharableGroups); err != nil {
			return nil, err
		}

		ec.ID = categoryID.String
		ec.SharableGroups = sharableGroups
		data = append(data, ec)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return data, nil
}

// CreateCategory ...
func CreateCategory(user string, draftCategory *model.Category) (*model.Category, error) {
	db, err := SetupDB(user)
	if err != nil {
		log.Printf("Failed to connect to the database: %v", err)
		return nil, err
	}
	defer db.Close()

	selectedStatusDetails, err := retrieveStatusDetails(user, draftCategory.CreatedBy, draftCategory.Status)
	if err != nil {
		log.Printf("Error retrieving status details: %v", err)
		return nil, err
	}
	if selectedStatusDetails == nil {
		return nil, errors.New("unable to find selected status")
	}

	tx, err := db.Begin()
	if err != nil {
		log.Printf("Error starting transaction: %v", err)
		return nil, err
	}

	sqlStr := `
	INSERT INTO community.category(
		name, description, color, status, min_items_limit, max_items_limit,
		created_by, created_at, updated_by, updated_at, sharable_groups
	) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
	RETURNING id, name, description, color, status, min_items_limit, max_items_limit,
		created_at, created_by, updated_at, updated_by, sharable_groups
	`

	row := tx.QueryRow(
		sqlStr,
		draftCategory.Name,
		draftCategory.Description,
		draftCategory.Color,
		selectedStatusDetails.ID,
		draftCategory.MinItemsLimit,
		draftCategory.MaxItemsLimit,
		draftCategory.CreatedBy,
		time.Now(),
		draftCategory.UpdatedBy,
		time.Now(),
		pq.Array(draftCategory.SharableGroups),
	)

	err = row.Scan(
		&draftCategory.ID,
		&draftCategory.Name,
		&draftCategory.Description,
		&draftCategory.Color,
		&draftCategory.Status,
		&draftCategory.MinItemsLimit,
		&draftCategory.MaxItemsLimit,
		&draftCategory.CreatedAt,
		&draftCategory.CreatedBy,
		&draftCategory.UpdatedAt,
		&draftCategory.UpdatedBy,
		pq.Array(&draftCategory.SharableGroups),
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

	draftCategory.StatusName = selectedStatusDetails.Name
	draftCategory.StatusDescription = selectedStatusDetails.Description

	return draftCategory, nil
}

// UpdateCategory ...
func UpdateCategory(user string, userID string, draftCategory *model.Category) (*model.Category, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	// retrieve selected status
	selectedStatusDetails, err := retrieveStatusDetails(user, userID, draftCategory.Status)
	if err != nil {
		return nil, err
	}
	if selectedStatusDetails == nil {
		return nil, errors.New("unable to find selected status")
	}

	sqlStr := `UPDATE community.category 
    SET 
    name = $2,
    description = $3,
	color = $4,
	status = $5,
	min_items_limit = $6,
	max_items_limit = $7,
    updated_by = $8,
    updated_at = $9
    WHERE id = $1
    RETURNING id, name, description, color, status, min_items_limit, max_items_limit, created_at, created_by, updated_at, updated_by, sharable_groups;
`
	tx, err := db.Begin()
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	parsedUpdatorID, err := uuid.Parse(draftCategory.UpdatedBy)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	var updatedCategory model.Category

	row := tx.QueryRow(sqlStr,
		draftCategory.ID,
		draftCategory.Name,
		draftCategory.Description,
		draftCategory.Color,
		selectedStatusDetails.ID,
		draftCategory.MinItemsLimit,
		draftCategory.MaxItemsLimit,
		parsedUpdatorID,
		time.Now(),
	)

	err = row.Scan(
		&updatedCategory.ID,
		&updatedCategory.Name,
		&updatedCategory.Description,
		&updatedCategory.Color,
		&updatedCategory.Status,
		&updatedCategory.MinItemsLimit,
		&updatedCategory.MaxItemsLimit,
		&updatedCategory.CreatedAt,
		&updatedCategory.CreatedBy,
		&updatedCategory.UpdatedAt,
		&updatedCategory.UpdatedBy,
		pq.Array(&updatedCategory.SharableGroups),
	)

	if err != nil {
		tx.Rollback()
		return nil, err
	}
	if err := tx.Commit(); err != nil {
		return nil, err
	}

	updatedCategory.Status = selectedStatusDetails.ID.String()
	updatedCategory.StatusName = selectedStatusDetails.Name
	updatedCategory.StatusDescription = selectedStatusDetails.Description

	return &updatedCategory, nil
}

// RemoveCategory ...
func RemoveCategory(user string, catID string) error {
	db, err := SetupDB(user)
	if err != nil {
		return err
	}
	defer db.Close()

	sqlStr := `DELETE FROM community.category WHERE id=$1`
	_, err = db.Exec(sqlStr, catID)
	if err != nil {
		log.Printf("unable to delete selected category. error: %+v", err)
		return err
	}
	return nil
}
