package db

import (
	"database/sql"
	"log"

	"github.com/lib/pq"
	"github.com/mohit2530/communityCare/model"
)

// RetrieveAllCategories ...
func RetrieveAllCategories(user string) ([]model.Category, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := "SELECT id, item_name, created_at, created_by, updated_at, updated_by, sharable_groups FROM asset.category"
	rows, err := db.Query(sqlStr)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var data []model.Category

	var categoryID sql.NullString
	var categoryName sql.NullString
	var createdBy sql.NullString
	var createdAt sql.NullTime
	var updatedBy sql.NullString
	var updatedAt sql.NullTime
	var sharableGroups pq.StringArray

	for rows.Next() {
		var ec model.Category
		if err := rows.Scan(&categoryID, &categoryName, &createdAt, &createdBy, &updatedAt, &updatedBy, &sharableGroups); err != nil {
			return nil, err
		}

		ec.ID = categoryID.String
		ec.CategoryName = categoryName.String
		ec.Created = createdAt.Time
		ec.CreatedBy = createdBy.String
		ec.Updated = updatedAt.Time
		ec.UpdatedBy = updatedBy.String
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
		return nil, err
	}
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		return nil, err
	}

	sqlStr := `
	INSERT INTO asset.category(item_name, item_description, created_by, created, updated_by, updated, sharable_groups)
	VALUES($1, $2, $3, $4, $5, $6, $7)
	RETURNING id, item_name, item_description, created, created_by, updated, updated_by, sharable_groups
	`

	row := tx.QueryRow(
		sqlStr,
		draftCategory.CategoryName,
		draftCategory.CategoryDescription,
		draftCategory.Created,
		draftCategory.CreatedBy,
		draftCategory.Updated,
		draftCategory.UpdatedBy,
		pq.Array(draftCategory.SharableGroups),
	)

	err = row.Scan(&draftCategory.ID, &draftCategory.CategoryName, &draftCategory.CategoryDescription, &draftCategory.Created, &draftCategory.CreatedBy, &draftCategory.Updated, &draftCategory.UpdatedBy, draftCategory.SharableGroups)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return draftCategory, nil
}

// RemoveCategory ...
func RemoveCategory(user string, catID string) error {
	db, err := SetupDB(user)
	if err != nil {
		return err
	}
	defer db.Close()

	sqlStr := `DELETE FROM asset.category WHERE id=$1`
	_, err = db.Exec(sqlStr, catID)
	if err != nil {
		log.Printf("unable to delete selected category. error: %+v", err)
		return err
	}
	return nil
}
