package db

import (
	"database/sql"
	"log"
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"github.com/mohit2530/communityCare/model"
)

// DeleteStorageLocation
func DeleteStorageLocation(user string, locationID string) error {
	db, err := SetupDB(user)
	if err != nil {
		return err
	}
	defer db.Close()

	sqlStr := `DELETE FROM asset.storage_locations WHERE id=$1`
	_, err = db.Exec(sqlStr, locationID)
	if err != nil {
		log.Printf("unable to delete event ID %+v", locationID)
		return err
	}
	return nil
}

// AddExpense ...
func AddExpense(user string, draftExpense *model.Expense) (*model.Expense, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	parsedEventID, err := uuid.Parse(draftExpense.EventID)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	parsedCategoryID, err := uuid.Parse(draftExpense.CategoryID)
	if err != nil {
		// if the location is not a uuid type, then it should resemble a new storage location
		emptyLocationID := ""
		err := addNewCategoryLocation(user, draftExpense.Category, draftExpense.CreatedBy, &emptyLocationID)
		if err != nil {
			tx.Rollback()
			return nil, err
		}
		parsedCategoryID, err = uuid.Parse(emptyLocationID)
		if err != nil {
			tx.Rollback()
			return nil, err
		}
		// Update draftExpense with the new LocationID
		draftExpense.CategoryID = emptyLocationID
	}

	parsedCreatorID, err := uuid.Parse(draftExpense.CreatedBy)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	currentTime := time.Now()
	draftExpense.CreatedAt = currentTime
	draftExpense.UpdatedAt = currentTime

	var sharableGroups = make([]uuid.UUID, 0)
	sharableGroups = append(sharableGroups, parsedCreatorID)

	var draftExpenseID uuid.UUID

	sqlStr := `
        INSERT INTO asset.expenses(
			project_id,
			item_name, 
			item_cost, 
			category_id, 
			purchase_location, 
			notes,
			created_by, 
			created_at, 
			updated_by, 
			updated_at,
			sharable_groups
		) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`
	err = tx.QueryRow(
		sqlStr,
		parsedEventID,
		draftExpense.ItemName,
		draftExpense.ItemCost,
		parsedCategoryID,
		draftExpense.PurchaseLocation,
		draftExpense.Notes,
		parsedCreatorID,
		currentTime,
		parsedCreatorID,
		currentTime,
		pq.Array(sharableGroups),
	).Scan(&draftExpenseID)

	if err != nil {
		tx.Rollback()
		return nil, err
	}

	draftExpense.ID = draftExpenseID.String()

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return draftExpense, nil
}

// RetrieveAllReports ...
func RetrieveAllReports(user string, eventID string) ([]model.ReportEvent, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := `SELECT 
	cr.id,
	cr.project_id, 
	cr.subject,
	cr.description,
	cr.event_location AS reported_event_location, 
	cr.organizer_name AS reported_organizer_name,
	cr.created_at, 
	cr.updated_at, 
	cr.created_by, 
	coalesce (cp.username , cp.full_name , cp.email_address ) as creator_name , 
	cr.updated_by, 
	coalesce (up.username , up.full_name , up.email_address ) as updator_name 
	FROM asset.reports cr
	LEFT JOIN asset.profiles cp on cp.id  = cr.created_by
	LEFT JOIN asset.profiles up on up.id  = cr.updated_by
	WHERE cr.project_id = $1
	ORDER BY cr.updated_at DESC
	`
	rows, err := db.Query(sqlStr, eventID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var draftReportEvents []model.ReportEvent

	for rows.Next() {
		var event model.ReportEvent
		if err := rows.Scan(&event.ID, &event.EventID, &event.Subject, &event.Description, &event.EventLocation, &event.OrganizerName, &event.CreatedAt, &event.UpdatedAt, &event.CreatedBy, &event.CreatorName, &event.UpdatedBy, &event.UpdatorName); err != nil {
			return nil, err
		}

		draftReportEvents = append(draftReportEvents, event)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return draftReportEvents, nil
}

// SaveNewReport ...
func SaveNewReport(user string, draftReport *model.ReportEvent) (*model.ReportEvent, error) {
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
	INSERT INTO asset.reports(project_id, subject, description, event_location, organizer_name, created_at, updated_at, created_by, updated_by, sharable_groups)
	VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
	RETURNING id
	`

	row := tx.QueryRow(
		sqlStr,
		draftReport.EventID,
		draftReport.Subject,
		draftReport.Description,
		draftReport.EventLocation,
		draftReport.OrganizerName,
		draftReport.CreatedAt,
		draftReport.UpdatedAt,
		draftReport.CreatedBy,
		draftReport.UpdatedBy,
		pq.Array(draftReport.SharableGroups),
	)

	err = row.Scan(&draftReport.ID)

	if err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return draftReport, nil
}

// DeleteReport
func DeleteReport(user string, reportID string) error {
	db, err := SetupDB(user)
	if err != nil {
		return err
	}
	defer db.Close()

	sqlStr := `DELETE FROM asset.reports WHERE id=$1`
	_, err = db.Exec(sqlStr, reportID)
	if err != nil {
		log.Printf("unable to delete report ID %+v", reportID)
		return err
	}
	return nil
}

// RetrieveAllStorageLocation ...
func RetrieveAllStorageLocation(user string) ([]model.StorageLocation, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := "SELECT id, location, created_at, created_by, updated_at, updated_by, sharable_groups FROM asset.storage_locations"
	rows, err := db.Query(sqlStr)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var data []model.StorageLocation

	var storageLocationID sql.NullString
	var storageLocation sql.NullString
	var createdBy sql.NullString
	var createdAt sql.NullTime
	var updatedBy sql.NullString
	var updatedAt sql.NullTime
	var sharableGroups pq.StringArray

	for rows.Next() {
		var ec model.StorageLocation
		if err := rows.Scan(&storageLocationID, &storageLocation, &createdAt, &createdBy, &updatedAt, &updatedBy, &sharableGroups); err != nil {
			return nil, err
		}

		ec.ID = storageLocationID.String
		ec.Location = storageLocation.String
		ec.CreatedAt = createdAt.Time
		ec.CreatedBy = createdBy.String
		ec.UpdatedAt = updatedAt.Time
		ec.UpdatedBy = updatedBy.String
		ec.SharableGroups = sharableGroups

		data = append(data, ec)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return data, nil
}

// addNewStorageLocation ...
//
// adds new storage location if not existing but if there was an existing storage location, we just return that ID
func addNewStorageLocation(user string, draftLocation string, created_by string, emptyLocationID *string) error {
	db, err := SetupDB(user)
	if err != nil {
		return err
	}
	defer db.Close()

	fetchSqlStr := `SELECT count(sl.id), sl.id FROM asset.storage_locations sl WHERE sl.location = $1 GROUP BY sl.id`
	var count int
	err = db.QueryRow(fetchSqlStr, draftLocation).Scan(&count, emptyLocationID)
	if err != nil {
		log.Printf("found existing location for selected item. using existing location for %+v", draftLocation)
	}

	// save new storage location if it does not already exists
	if count == 0 {
		sqlStr := `INSERT INTO asset.storage_locations(location, created_by, updated_by, created_at, updated_at, sharable_groups) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`

		var locationID string
		var sharableGroups = make([]uuid.UUID, 0)

		userID, err := uuid.Parse(created_by)
		if err != nil {
			return err
		}
		sharableGroups = append(sharableGroups, userID)

		err = db.QueryRow(
			sqlStr,
			draftLocation,
			created_by,
			created_by,
			time.Now(),
			time.Now(),
			pq.Array(sharableGroups),
		).Scan(&locationID)

		if err != nil {
			return err
		}
		*emptyLocationID = locationID
	}

	return nil
}

// addNewCategoryLocation ...
//
// adds new storage location if not existing
func addNewCategoryLocation(user string, draftCategoryName string, created_by string, emptyLocationID *string) error {
	db, err := SetupDB(user)
	if err != nil {
		return err
	}
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		return err
	}

	sqlStr := `INSERT INTO asset.category(
		item_name, 
		created_by, 
		updated_by, 
		created_at, 
		updated_at, 
		sharable_groups) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`

	var sharableGroups = make([]uuid.UUID, 0)

	userID, err := uuid.Parse(created_by)
	if err != nil {
		tx.Rollback()
		return err
	}

	sharableGroups = append(sharableGroups, userID)

	row := tx.QueryRow(
		sqlStr,
		draftCategoryName,
		created_by,
		created_by,
		time.Now(),
		time.Now(),
		pq.Array(sharableGroups),
	)

	err = row.Scan(emptyLocationID)

	if err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.Commit(); err != nil {
		return err
	}

	return nil
}
