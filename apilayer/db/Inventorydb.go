package db

import (
	"time"

	"github.com/google/uuid"
	"github.com/mohit2530/communityCare/model"
)

// RetrieveAllInventoriesForUser ...
func RetrieveAllInventoriesForUser(user string, userID string) ([]model.Inventory, error) {

	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := `SELECT
    inv.id,
    inv.name,
    inv.description,
    inv.price,
    inv.status,
    inv.barcode,
    inv.sku,
    inv.quantity,
	inv.boughtAt,
    inv.location,
    inv.storage_location_id,
    inv.created_by,
    COALESCE(cp.username, cp.full_name, cp.email_address) AS creator_name,
    inv.created_at,
    inv.updated_by,
    COALESCE(up.username, up.full_name, up.email_address) AS updater_name,
    inv.updated_at
FROM
    community.inventory inv
LEFT JOIN community.profiles cp ON inv.created_by = cp.id
LEFT JOIN community.profiles up ON inv.updated_by = up.id
WHERE
   inv.created_by = $1
ORDER BY
   inv.updated_at  DESC;
	`
	rows, err := db.Query(sqlStr, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var data []model.Inventory

	for rows.Next() {
		var inventory model.Inventory

		if err := rows.Scan(
			&inventory.ID,
			&inventory.Name,
			&inventory.Description,
			&inventory.Price,
			&inventory.Status,
			&inventory.Barcode,
			&inventory.SKU,
			&inventory.Quantity,
			&inventory.BoughtAt,
			&inventory.Location,
			&inventory.StorageLocationID,
			&inventory.CreatedBy,
			&inventory.CreatorName,
			&inventory.CreatedAt,
			&inventory.UpdatedBy,
			&inventory.UpdaterName,
			&inventory.UpdatedAt,
		); err != nil {
			return nil, err
		}
		data = append(data, inventory)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	if len(data) == 0 {
		// empty array to factor in for null
		return make([]model.Inventory, 0), nil
	}
	return data, nil
}

// AddInventory ...
func AddInventory(user string, draftInventory model.Inventory, userID string) (*model.Inventory, error) {

	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		return nil, err
	}

	sqlStr := `INSERT INTO community.inventory
	(name, description, price, status, barcode, sku, quantity, boughtAt, location, storage_location_id, created_by, created_at, updated_by, updated_at)
    VALUES
	($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
	RETURNING id`

	// storage location is unique key in the database.
	// storage location can be shared across inventories and items that are stored in events.
	parsedStorageLocationID, err := uuid.Parse(draftInventory.Location)
	if err != nil {
		// if the location is not a uuid type, then it should resemble a new storage location
		emptyLocationID := ""
		err := addNewStorageLocation(user, draftInventory.Location, draftInventory.CreatedBy, &emptyLocationID)
		if err != nil {
			tx.Rollback()
			return nil, err
		}
		parsedStorageLocationID, err = uuid.Parse(emptyLocationID)
		if err != nil {
			tx.Rollback()
			return nil, err
		}
		draftInventory.StorageLocationID = emptyLocationID
	}

	err = tx.QueryRow(
		sqlStr,
		draftInventory.Name,
		draftInventory.Description,
		draftInventory.Price,
		draftInventory.Status,
		draftInventory.Barcode,
		draftInventory.SKU,
		draftInventory.Quantity,
		draftInventory.BoughtAt,
		draftInventory.Location,
		parsedStorageLocationID,
		draftInventory.CreatedBy,
		time.Now(),
		draftInventory.UpdatedBy,
		time.Now(),
	).Scan(&draftInventory.ID)

	if err != nil {
		// Rollback the transaction if there is an error
		tx.Rollback()
		return nil, err
	}

	// Commit the transaction if everything is successful
	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return &draftInventory, nil
}
