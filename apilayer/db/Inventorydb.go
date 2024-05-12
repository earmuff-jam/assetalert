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

// RetrieveAllInventoriesForUser ...
func RetrieveAllInventoriesForUser(user string, userID string) ([]model.Inventory, error) {

	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		log.Printf("unable to start trasanction with selected db pool. error: %+v", err)
		return nil, err
	}

	data, err := retrieveAllInventoryDetailsForUser(tx, userID)
	if err != nil {
		log.Printf("unable to retrieve all inventories details for user. error: %+v", err)
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	if len(data) == 0 {
		return make([]model.Inventory, 0), nil
	}

	return data, nil
}

func retrieveAllInventoryDetailsForUser(tx *sql.Tx, userID string) ([]model.Inventory, error) {
	sqlStr := `SELECT
    inv.id,
    inv.name,
    inv.description,
    inv.price,
    inv.status,
    inv.barcode,
    inv.sku,
    inv.quantity,
	inv.bought_at,
    inv.location,
	inv.is_transfer_allocated,
	p.title,
    inv.storage_location_id,
	inv.is_returnable,
	inv.return_location,
	inv.max_weight,
	inv.min_weight,
	inv.max_height,
	inv.min_height,
    inv.created_by,
    COALESCE(cp.username, cp.full_name, cp.email_address) AS creator_name,
    inv.created_at,
    inv.updated_by,
    COALESCE(up.username, up.full_name, up.email_address) AS updater_name,
    inv.updated_at
FROM
    community.inventory inv
LEFT JOIN community.projects p ON inv.associated_event_id = p.id
LEFT JOIN community.profiles cp ON inv.created_by = cp.id
LEFT JOIN community.profiles up ON inv.updated_by = up.id
WHERE
   inv.created_by = $1
ORDER BY
   inv.updated_at  DESC;
	`
	rows, err := tx.Query(sqlStr, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var data []model.Inventory

	for rows.Next() {
		var inventory model.Inventory

		var returnLocation sql.NullString
		var maxWeight sql.NullString
		var minWeight sql.NullString
		var maxHeight sql.NullString
		var minHeight sql.NullString
		var isTransferAllocated sql.NullBool
		var associatedEventTitle sql.NullString

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
			&isTransferAllocated,
			&associatedEventTitle,
			&inventory.StorageLocationID,
			&inventory.IsReturnable,
			&returnLocation,
			&maxWeight,
			&minWeight,
			&maxHeight,
			&minHeight,
			&inventory.CreatedBy,
			&inventory.CreatorName,
			&inventory.CreatedAt,
			&inventory.UpdatedBy,
			&inventory.UpdaterName,
			&inventory.UpdatedAt,
		); err != nil {
			return nil, err
		}

		if isTransferAllocated.Valid {
			inventory.IsTransferAllocated = isTransferAllocated.Bool
		}
		if associatedEventTitle.Valid {
			inventory.AssociatedEventTitle = associatedEventTitle.String
		}
		if returnLocation.Valid {
			inventory.ReturnLocation = returnLocation.String
		}
		if maxWeight.Valid {
			inventory.MaxWeight = maxWeight.String
		}
		if minWeight.Valid {
			inventory.MinWeight = minWeight.String
		}
		if maxHeight.Valid {
			inventory.MaxHeight = maxHeight.String
		}
		if minHeight.Valid {
			inventory.MinHeight = minHeight.String
		}

		data = append(data, inventory)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}
	return data, nil
}

// AddInventoryInBulk ...
func AddInventoryInBulk(user string, userID string, draftInventoryList model.InventoryListRequest) ([]model.Inventory, error) {

	db, err := SetupDB(user)
	if err != nil {
		log.Printf("unable setup database connection. error: %+v", err)
		return nil, err
	}
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		log.Printf("unable to start trasanction with selected db pool. error: %+v", err)
		return nil, err
	}

	for _, v := range draftInventoryList.InventoryList {

		// storage location is unique key in the database.
		// storage location can be shared across inventories and items that are stored in events.
		parsedStorageLocationID, err := uuid.Parse(v.Location)
		if err != nil {
			// if the location is not a uuid type, then it should resemble a new storage location
			emptyLocationID := ""
			err := addNewStorageLocation(user, v.Location, userID, &emptyLocationID)
			if err != nil {
				log.Printf("unable to retrieve selected location id. error: %+v", err)
				tx.Rollback()
				return nil, err
			}
			parsedStorageLocationID, err = uuid.Parse(emptyLocationID)
			if err != nil {
				log.Printf("unable to parse the found location id. error: %+v", err)
				tx.Rollback()
				return nil, err
			}
			v.StorageLocationID = emptyLocationID
		}

		parsedCreatedByUUID, err := uuid.Parse(userID)
		if err != nil {
			log.Printf("unable to parse the creator id. error: %+v", err)
			tx.Rollback()
			return nil, err
		}

		sqlStr := `INSERT INTO community.inventory (
			name, 
			description, 
			price, 
			status, 
			barcode, 
			sku, 
			quantity, 
			bought_at, 
			location, 
			storage_location_id, 
			created_by, 
			created_at, 
			updated_by, 
			updated_at
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`

		_, err = tx.Exec(
			sqlStr,
			v.Name,
			v.Description,
			v.Price,
			v.Status,
			v.Barcode,
			v.SKU,
			v.Quantity,
			v.BoughtAt,
			v.Location,
			parsedStorageLocationID,
			parsedCreatedByUUID,
			time.Now(),
			parsedCreatedByUUID,
			time.Now(),
		)

		if err != nil {
			tx.Rollback()
			return nil, err
		}

	}

	if err := tx.Commit(); err != nil {
		log.Printf("unable to process trasanction with selected db pool. error: %+v", err)
		return nil, err
	}

	tx, err = db.Begin()
	if err != nil {
		log.Printf("unable to start trasanction with selected db pool. error: %+v", err)
		return nil, err
	}

	resp, err := retrieveAllInventoryDetailsForUser(tx, userID)
	if err != nil {
		log.Printf("unable to retrieve all inventories for selected user. error: %+v", err)
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		log.Printf("unable to process trasanction with selected db pool. error: %+v", err)
		return nil, err
	}

	draftInventoryList.InventoryList = resp
	return draftInventoryList.InventoryList, nil
}

// AddInventory ...
func AddInventory(user string, userID string, draftInventory model.Inventory) (*model.Inventory, error) {

	db, err := SetupDB(user)
	if err != nil {
		log.Printf("unable to start the db. error: %+v", err)
		return nil, err
	}
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		log.Printf("unable to start tx. error: %+v", err)
		return nil, err
	}

	// if UUID is not present, add new storage location
	parsedStorageLocationID, err := uuid.Parse(draftInventory.Location)
	if err != nil {
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

	// if UUID is present, retrieve selected storage location
	sqlStr := `SELECT location FROM community.storage_locations sl WHERE sl.id=$1;`
	err = tx.QueryRow(sqlStr, parsedStorageLocationID).Scan(&draftInventory.Location)
	if err != nil {
		log.Printf("unable to retrieve selected location from storage location id. error: %+v", err)
		tx.Rollback()
		return nil, err
	}
	parsedCreatedByUUID, err := uuid.Parse(draftInventory.CreatedBy)
	if err != nil {
		log.Printf("unable to parse creator userID. error: %+v", err)
		tx.Rollback()
		return nil, err
	}

	currentTimestamp := time.Now()
	draftInventory.CreatedAt = currentTimestamp
	draftInventory.UpdatedAt = currentTimestamp

	sqlStr = `INSERT INTO community.inventory (name,
		description,
		price,
		status,
		barcode,
		sku,
		quantity,
		bought_at,
		location,
		storage_location_id,
		is_returnable,
		return_location,
		max_weight,
		min_weight,
		max_height,
		min_height,
		created_by,
		created_at,
		updated_by,
		updated_at)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
RETURNING id;`

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
		draftInventory.IsReturnable,
		draftInventory.ReturnLocation,
		draftInventory.MaxWeight,
		draftInventory.MinWeight,
		draftInventory.MaxHeight,
		draftInventory.MinHeight,
		parsedCreatedByUUID,
		draftInventory.CreatedAt,
		parsedCreatedByUUID,
		draftInventory.UpdatedAt,
	).Scan(&draftInventory.ID)

	if err != nil {
		log.Printf("unable to add selected inventory. error: %+v", err)
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return &draftInventory, nil
}

// UpdateInventory ...
func UpdateInventory(user string, userID string, draftInventory model.InventoryItemToUpdate) (*model.Inventory, error) {

	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		return nil, err
	}

	parsedInventoryID, err := uuid.Parse(draftInventory.ID)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	parsedUserID, err := uuid.Parse(draftInventory.UserID)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	columnToUpdate := draftInventory.Column

	sqlStr := `
        UPDATE community.inventory
        SET ` + columnToUpdate + ` = $1,
            updated_by = $2,
            updated_at = now()
        WHERE id = $3
        RETURNING id`

	var updatedInventoryID uuid.UUID
	err = tx.QueryRow(sqlStr, draftInventory.Value, parsedUserID, parsedInventoryID).Scan(&updatedInventoryID)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		tx.Rollback()
		return nil, errors.New("commit failed: " + err.Error())
	}

	// new tx to bring fresh values
	tx, err = db.Begin()
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	sqlGetUpdatedInventory := `
	SELECT
		inv.id,
		inv.name,
		inv.description,
		inv.price,
		inv.status,
		inv.barcode,
		inv.sku,
		inv.quantity,
		inv.bought_at,
		inv.location,
		inv.storage_location_id,
		inv.is_returnable,
		inv.return_location,
		inv.max_weight,
		inv.min_weight,
		inv.max_height,
		inv.min_height,
		inv.created_at,
		inv.created_by,
		coalesce (cp.full_name, cp.username, cp.email_address) as creator_name,
		inv.updated_at,
		inv.updated_by,
		coalesce (up.full_name, up.username, up.email_address)  as updater_name
	FROM
		community.inventory inv
	LEFT JOIN community.storage_locations sl on sl.id = inv.storage_location_id 
	LEFT JOIN community.profiles cp on cp.id  = inv.created_by
	LEFT JOIN community.profiles up on up.id  = inv.updated_by
	WHERE inv.id = $1
`

	row := tx.QueryRow(sqlGetUpdatedInventory, updatedInventoryID)

	updatedInventory := model.Inventory{}
	err = row.Scan(
		&updatedInventory.ID,
		&updatedInventory.Name,
		&updatedInventory.Description,
		&updatedInventory.Price,
		&updatedInventory.Status,
		&updatedInventory.Barcode,
		&updatedInventory.SKU,
		&updatedInventory.Quantity,
		&updatedInventory.BoughtAt,
		&updatedInventory.Location,
		&updatedInventory.StorageLocationID,
		&updatedInventory.IsReturnable,
		&updatedInventory.ReturnLocation,
		&updatedInventory.MaxWeight,
		&updatedInventory.MinWeight,
		&updatedInventory.MaxHeight,
		&updatedInventory.MinHeight,
		&updatedInventory.CreatedAt,
		&updatedInventory.CreatedBy,
		&updatedInventory.CreatorName,
		&updatedInventory.UpdatedAt,
		&updatedInventory.UpdatedBy,
		&updatedInventory.UpdaterName,
	)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	// Commit the transaction
	if err := tx.Commit(); err != nil {
		return nil, err
	}

	// Return the updated inventory object
	return &updatedInventory, nil
}

// RetrieveAllInventoriesAssociatedWithSelectEvent ...
func RetrieveAllInventoriesAssociatedWithSelectEvent(user string, parsedEventID uuid.UUID) ([]model.Inventory, error) {
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
    inv.bought_at,
    inv.location,
    inv.is_transfer_allocated,
    e.title,
    inv.storage_location_id,
    inv.created_by,
    COALESCE(cp.username, cp.full_name, cp.email_address) AS creator_name,
    inv.created_at,
    inv.updated_by,
    COALESCE(up.username, up.full_name, up.email_address) AS updater_name,
    inv.updated_at
FROM
    community.inventory inv
		LEFT JOIN community.projects e ON inv.associated_event_id = e.id
        LEFT JOIN community.profiles cp ON inv.created_by = cp.id
        LEFT JOIN community.profiles up ON inv.updated_by = up.id
WHERE
    inv.associated_event_id = $1
  AND
    inv.is_transfer_allocated = true
ORDER BY inv.updated_at DESC;
	`

	rows, err := db.Query(sqlStr, parsedEventID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var data []model.Inventory

	for rows.Next() {
		var inventory model.Inventory

		var isTransferAllocated sql.NullBool
		var associatedEventTitle sql.NullString

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
			&isTransferAllocated,
			&associatedEventTitle,
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

		if isTransferAllocated.Valid {
			inventory.IsTransferAllocated = isTransferAllocated.Bool
		}
		if associatedEventTitle.Valid {
			inventory.AssociatedEventTitle = associatedEventTitle.String
		}

		data = append(data, inventory)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	if len(data) == 0 {
		return make([]model.Inventory, 0), nil
	}
	return data, nil
}

// TransferInventory ...
func TransferInventory(user string, userID string, draftInventory model.TransferInventory) (*[]model.Inventory, error) {

	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		return nil, err
	}

	parsedEventID, err := uuid.Parse(draftInventory.EventID)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	parsedUserID, err := uuid.Parse(draftInventory.UserID)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	columnToUpdate := draftInventory.Column

	sqlStr := `
        UPDATE community.inventory
        SET ` + columnToUpdate + ` = $1,
			associated_event_id = $4,
			updated_by = $2,
            updated_at = now()
        WHERE 
			id = $3
        RETURNING id;`

	var updatedInventoryItemIDList []model.Inventory
	for _, itemID := range draftInventory.ItemIDs {

		parsedItemID, err := uuid.Parse(itemID)
		if err != nil {
			log.Printf("unable to parse selected item. error: %+v", err)
			tx.Rollback()
			return nil, err
		}

		var updatedInventory model.Inventory
		err = tx.QueryRow(sqlStr, draftInventory.Value, parsedUserID, parsedItemID, parsedEventID).Scan(&updatedInventory.ID)

		if err != nil {
			log.Printf("unable to updated selected item. error: %+v", err)
			tx.Rollback()
			return nil, err
		}
		updatedInventoryItemIDList = append(updatedInventoryItemIDList, updatedInventory)
	}

	if err := tx.Commit(); err != nil {
		log.Printf("unable to update all items. error: %+v", err)
		tx.Rollback()
		return nil, errors.New("commit failed: " + err.Error())
	}

	// new tx to bring fresh values
	tx, err = db.Begin()
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	sqlGetUpdatedInventory := `
	SELECT
		inv.id,
		inv.name,
		inv.description,
		inv.price,
		inv.status,
		inv.barcode,
		inv.sku,
		inv.quantity,
		inv.bought_at,
		inv.location,
		inv.is_transfer_allocated,
		inv.associated_event_id,
		e.title,
		inv.storage_location_id,
		inv.created_at,
		inv.created_by,
		coalesce (cp.full_name, cp.username, cp.email_address) as creator_name,
		inv.updated_at,
		inv.updated_by,
		coalesce (up.full_name, up.username, up.email_address)  as updater_name
	FROM
		community.inventory inv
	LEFT JOIN community.projects e ON inv.associated_event_id = e.id
	LEFT JOIN community.storage_locations sl on sl.id = inv.storage_location_id 
	LEFT JOIN community.profiles cp on cp.id  = inv.created_by
	LEFT JOIN community.profiles up on up.id  = inv.updated_by
	WHERE inv.id = $1;`

	var updatedInventoryList []model.Inventory

	for _, v := range updatedInventoryItemIDList {
		row := tx.QueryRow(sqlGetUpdatedInventory, v.ID)

		updatedInventory := model.Inventory{}
		err = row.Scan(
			&updatedInventory.ID,
			&updatedInventory.Name,
			&updatedInventory.Description,
			&updatedInventory.Price,
			&updatedInventory.Status,
			&updatedInventory.Barcode,
			&updatedInventory.SKU,
			&updatedInventory.Quantity,
			&updatedInventory.BoughtAt,
			&updatedInventory.Location,
			&updatedInventory.IsTransferAllocated,
			&updatedInventory.AssociatedEventID,
			&updatedInventory.AssociatedEventTitle,
			&updatedInventory.StorageLocationID,
			&updatedInventory.CreatedAt,
			&updatedInventory.CreatedBy,
			&updatedInventory.CreatorName,
			&updatedInventory.UpdatedAt,
			&updatedInventory.UpdatedBy,
			&updatedInventory.UpdaterName,
		)
		updatedInventoryList = append(updatedInventoryList, updatedInventory)

		if err != nil {
			log.Printf("unable to retrieve all updated items. error: %+v", err)
			tx.Rollback()
			return nil, err
		}
	}

	// Commit the transaction
	if err := tx.Commit(); err != nil {
		return nil, err
	}

	// Return the updated inventory object
	return &updatedInventoryList, nil
}

// DeleteInventory ...
func DeleteInventory(user string, userID string, pruneInventoriesIDs []string) ([]string, error) {

	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := `DELETE FROM community.inventory WHERE id = ANY($1)`
	_, err = db.Exec(sqlStr, pq.Array(pruneInventoriesIDs))
	if err != nil {
		log.Printf("unable to delete selected inventories: %v", pruneInventoriesIDs)
		return nil, err
	}
	return pruneInventoriesIDs, nil
}
