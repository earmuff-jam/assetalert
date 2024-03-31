package db

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"mime/multipart"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"github.com/mohit2530/communityCare/model"
)

// RetrieveAllEvents ...
func RetrieveAllEvents(user string) ([]model.Event, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := `SELECT ev.id,
	ev.title,
	ev.description,
	ev.cause,
	CASE 
	   	WHEN ev.image_url IS NOT NULL THEN ENCODE(ev.image_url::bytea,'base64')
		ELSE ''
	END AS base64,
	ev.street,
	ev.city,
	ev.state,
	ev.zip,
	ev.boundingbox,
	ev.class,
	ev.display_name,
	ev.importance,
	ev.lat,
	ev.licence,
	ev.lon,
	ev.osm_id,
	ev.osm_type,
	ev.place_id,
	ev.powered_by,
	ev.type,
	ev.project_type,
	ARRAY_AGG(COALESCE(ps.skill, '')) AS required_skills,
	ev.comments,
	ev.registration_link,
	ev.max_attendees,
	ev.attendees,
	ev.required_total_man_hours,
	ev.deactivated,
	ev.deactivated_reason,
	ev.start_date,
	ev.created_at,
	ev.created_by,
	ev.updated_at,
	ev.updated_by,
	ev.sharable_groups
	FROM community.projects ev
	LEFT JOIN community.project_skills ps ON ev.id = ps.project_id
	GROUP BY ev.id, ev.updated_at
	ORDER BY ev.updated_at DESC
	`
	rows, err := db.Query(sqlStr)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var data []model.Event

	var cause sql.NullString
	var imageURL sql.NullString
	var street sql.NullString
	var city sql.NullString
	var state sql.NullString
	var zip sql.NullString
	var boundingbox pq.StringArray
	var class sql.NullString
	var displayName sql.NullString
	var importance sql.NullString
	var lat sql.NullString
	var licence sql.NullString
	var lon sql.NullString
	var osmID sql.NullString
	var osmType sql.NullString
	var placeID sql.NullString
	var poweredBy sql.NullString
	var displayType sql.NullString
	var comments sql.NullString
	var required_skills pq.StringArray
	var registrationLink sql.NullString
	var maxAttendees sql.NullInt64
	var attendees pq.StringArray
	var deactivatedReason sql.NullString
	var startDate sql.NullTime
	var createdAt sql.NullTime
	var updatedAt sql.NullTime
	var sharableGroups pq.StringArray

	for rows.Next() {
		var event model.Event
		if err := rows.Scan(&event.ID, &event.Title, &event.Description, &cause, &imageURL, &street, &city, &state, &zip, &boundingbox, &class, &displayName, &importance, &lat, &licence, &lon, &osmID, &osmType, &placeID, &poweredBy, &displayType, &event.ProjectType, &required_skills, &comments, &registrationLink, &maxAttendees, &attendees, &event.TotalManHours, &event.Deactivated, &deactivatedReason, &startDate, &createdAt, &event.CreatedBy, &updatedAt, &event.UpdatedBy, &sharableGroups); err != nil {
			return nil, err
		}

		// Assign values to the struct
		event.Cause = cause.String
		event.ImageURL = imageURL.String
		event.Street = street.String
		event.City = city.String
		event.State = state.String
		event.ZipCode = zip.String
		event.BoundingBox = boundingbox
		event.Class = class.String
		event.DisplayName = displayName.String
		event.Importance = importance.String
		event.Lattitude = lat.String
		event.Longitude = lon.String
		event.OsmID = osmID.String
		event.OsmType = osmType.String
		event.PlaceID = placeID.String
		event.PoweredBy = poweredBy.String
		event.Type = displayType.String
		event.Comments = comments.String
		event.ProjectSkills = required_skills
		event.RegistrationLink = registrationLink.String
		event.MaxAttendees = int(maxAttendees.Int64)
		event.Attendees = attendees
		event.DeactivatedReason = deactivatedReason.String
		event.StartDate = startDate.Time
		event.CreatedAt = createdAt.Time
		event.UpdatedAt = updatedAt.Time
		event.SharableGroups = sharableGroups

		data = append(data, event)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return data, nil
}

// SaveNewEvent ...
func SaveNewEvent(user string, draftEvent *model.Event) (*model.Event, error) {
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
        INSERT INTO community.projects
        (title, description, cause, image_url, street, city, state, zip, boundingbox, class, display_name, importance, lat, licence, lon, osm_id, osm_type, place_id, powered_by, type, project_type, comments, registration_link, max_attendees, attendees, required_total_man_hours, deactivated, start_date, created_by, updated_by, sharable_groups)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31)
        RETURNING id`

	var draftEventID string
	err = tx.QueryRow(
		sqlStr,
		draftEvent.Title,
		draftEvent.Description,
		draftEvent.Cause,
		draftEvent.ImageURL,
		draftEvent.Street,
		draftEvent.City,
		draftEvent.State,
		draftEvent.ZipCode,
		pq.Array(draftEvent.BoundingBox),
		draftEvent.Class,
		draftEvent.DisplayName,
		draftEvent.Importance,
		draftEvent.Lattitude,
		draftEvent.License,
		draftEvent.Longitude,
		draftEvent.OsmID,
		draftEvent.OsmType,
		draftEvent.PlaceID,
		draftEvent.PoweredBy,
		draftEvent.Type,
		draftEvent.ProjectType,
		draftEvent.Comments,
		draftEvent.RegistrationLink,
		draftEvent.MaxAttendees,
		pq.Array(draftEvent.Attendees),
		draftEvent.TotalManHours,
		draftEvent.Deactivated,
		draftEvent.StartDate,
		draftEvent.CreatedBy,
		draftEvent.UpdatedBy,
		pq.Array(draftEvent.SharableGroups),
	).Scan(&draftEventID)

	if err != nil {
		tx.Rollback()
		return nil, err
	}

	draftEvent.ID = draftEventID

	for _, skill := range draftEvent.ProjectSkills {
		_, err = tx.Exec(`
            INSERT INTO community.project_skills
            (project_id, skill, created_by, updated_by, created_at, updated_at)
            VALUES
            ($1, $2, $3, $4, $5, $6)`,
			draftEventID,
			skill,
			draftEvent.CreatedBy,
			draftEvent.UpdatedBy,
			time.Now().UTC(),
			time.Now().UTC(),
		)
		if err != nil {
			tx.Rollback()
			return nil, err
		}
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return draftEvent, nil
}

// DeleteEvent
func DeleteEvent(user string, eventID string) error {
	db, err := SetupDB(user)
	if err != nil {
		return err
	}
	defer db.Close()

	sqlStr := `DELETE FROM community.projects WHERE id=$1`
	_, err = db.Exec(sqlStr, eventID)
	if err != nil {
		log.Printf("unable to delete event ID %+v", eventID)
		return err
	}
	return nil
}

// DeleteStorageLocation
func DeleteStorageLocation(user string, locationID string) error {
	db, err := SetupDB(user)
	if err != nil {
		return err
	}
	defer db.Close()

	sqlStr := `DELETE FROM community.storage_locations WHERE id=$1`
	_, err = db.Exec(sqlStr, locationID)
	if err != nil {
		log.Printf("unable to delete event ID %+v", locationID)
		return err
	}
	return nil
}

// UpdateEventAvatar ...
func UpdateEventAvatar(user string, userID string, header *multipart.FileHeader, fileBytes []byte) (*model.Event, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		return nil, err
	}

	var updatedEvent model.Event
	sqlStr := `
		UPDATE community.projects
		SET image_url = $2
		WHERE id = $1
		RETURNING id, image_url
	`

	// Use QueryRow instead of Exec to get the updated row
	// Assuming avatar_url is a string column, not bytea
	var avatarUrl sql.NullString

	row := tx.QueryRow(sqlStr, userID, fileBytes)
	err = row.Scan(
		&updatedEvent.ID,
		&avatarUrl, // Use & for nullable columns
	)

	if err != nil {
		tx.Rollback()
		return nil, err
	}

	if avatarUrl.Valid {
		updatedEvent.ImageURL = avatarUrl.String
	} else {
		updatedEvent.ImageURL = ""
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return &updatedEvent, nil
}

// RetrieveAllItems ...
func RetrieveAllItems(user string, eventID uuid.UUID) ([]model.Item, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := `
	SELECT
	it.id,
	it.project_id,
	it.storage_location_id,
	sl.location,
	it.item_detail,
	it.quantity,
	it.unit_price,
	it.bought_at,
	it.item_description,
	it.created_by,
	coalesce (cp.full_name, cp.username, cp.email_address) as creator_name,
	it.created_at,
	it.updated_by,
	coalesce (up.full_name, up.username, up.email_address)  as updater_name,
	it.updated_at
FROM
	community.items it
LEFT JOIN community.storage_locations sl on sl.id = it.storage_location_id 
LEFT JOIN community.profiles cp on cp.id  = it.created_by
LEFT JOIN community.profiles up on up.id  = it.updated_by
WHERE project_id =$1
ORDER BY it.updated_at DESC

	`
	rows, err := db.Query(sqlStr, eventID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var data []model.Item

	for rows.Next() {
		var item model.Item
		var boughtAtNull sql.NullString

		if err := rows.Scan(
			&item.ID,
			&item.EventID,
			&item.LocationID,
			&item.Location,
			&item.Name,
			&item.Quantity,
			&item.UnitPrice,
			&boughtAtNull,
			&item.Description,
			&item.CreatedBy,
			&item.CreatorName,
			&item.CreatedAt,
			&item.UpdatedBy,
			&item.UpdaterName,
			&item.UpdatedAt,
		); err != nil {
			return nil, err
		}
		item.BoughtAt = boughtAtNull.String
		data = append(data, item)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	if len(data) == 0 {
		return make([]model.Item, 0), nil
	}
	return data, nil
}

// AddItem ...
func AddItem(user string, draftItem *model.Item) (*model.Item, error) {
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

	parsedEventID, err := uuid.Parse(draftItem.EventID)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	parsedStorageLocationID, err := uuid.Parse(draftItem.Location)
	if err != nil {
		emptyLocationID := ""
		err := addNewStorageLocation(user, draftItem.Location, draftItem.CreatedBy, &emptyLocationID)
		if err != nil {
			tx.Rollback()
			return nil, err
		}
		parsedStorageLocationID, err = uuid.Parse(emptyLocationID)
		if err != nil {
			tx.Rollback()
			return nil, err
		}
		draftItem.LocationID = emptyLocationID
	}

	parsedCreatorID, err := uuid.Parse(draftItem.CreatedBy)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	var draftItemID uuid.UUID

	sqlStr := `INSERT INTO community.items(project_id, storage_location_id, item_detail, quantity, item_description, created_by, created_at, updated_by, updated_at)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`

	err = tx.QueryRow(
		sqlStr,
		parsedEventID,
		parsedStorageLocationID,
		draftItem.Name,
		draftItem.Quantity,
		draftItem.Description,
		parsedCreatorID,
		time.Now(),
		parsedCreatorID,
		time.Now(),
	).Scan(&draftItemID)

	if err != nil {
		tx.Rollback()
		return nil, err
	}

	draftItem.ID = draftItemID.String()

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return draftItem, nil
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
        INSERT INTO community.expenses(
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

// UpdateItem ...
func UpdateItem(user string, draftItem *model.ItemToUpdate) (*model.Item, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		return nil, err
	}

	parsedItemID, err := uuid.Parse(draftItem.ItemID)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	parsedUserID, err := uuid.Parse(draftItem.UserID)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	columnToUpdate := draftItem.Column

	sqlStr := `
        UPDATE community.items
        SET ` + columnToUpdate + ` = $1,
            updated_by = $2,
            updated_at = now()
        WHERE id = $3
        RETURNING id`

	var updatedItemID uuid.UUID
	err = tx.QueryRow(sqlStr, draftItem.Value, parsedUserID, parsedItemID).Scan(&updatedItemID)
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

	sqlGetUpdatedItem := `
        SELECT
            it.id,
            it.project_id,
            it.storage_location_id,
            sl.location,
            it.item_detail,
            it.quantity,
            it.unit_price,
            it.bought_at,
            it.item_description,
            it.created_by,
            coalesce (cp.full_name, cp.username, cp.email_address) as creator_name,
            it.created_at,
            it.updated_by,
            coalesce (up.full_name, up.username, up.email_address)  as updater_name,
            it.updated_at
        FROM
            community.items it
        LEFT JOIN community.storage_locations sl on sl.id = it.storage_location_id 
        LEFT JOIN community.profiles cp on cp.id  = it.created_by
        LEFT JOIN community.profiles up on up.id  = it.updated_by
        WHERE it.id = $1
    `

	row := tx.QueryRow(sqlGetUpdatedItem, updatedItemID)
	var item model.Item
	var boughtAtNull sql.NullString

	if err := row.Scan(
		&item.ID,
		&item.EventID,
		&item.LocationID,
		&item.Location,
		&item.Name,
		&item.Quantity,
		&item.UnitPrice,
		&boughtAtNull,
		&item.Description,
		&item.CreatedBy,
		&item.CreatorName,
		&item.CreatedAt,
		&item.UpdatedBy,
		&item.UpdaterName,
		&item.UpdatedAt,
	); err != nil {
		return nil, err
	}
	item.BoughtAt = boughtAtNull.String

	if err := tx.Commit(); err != nil {
		return nil, errors.New("commit failed: " + err.Error())
	}

	return &item, nil
}

// UpdateEvent ...
func UpdateEvent(user string, draftEvent *model.Event) (*model.Event, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		return nil, err
	}

	updateFields := make(map[string]interface{})

	if draftEvent.ID == "" {
		return nil, errors.New("missing event ID")
	}

	updateFields["id"] = draftEvent.ID

	if draftEvent.Title != "" {
		updateFields["title"] = draftEvent.Title
	}
	if draftEvent.DeactivatedReason != "" {
		updateFields["deactivated_reason"] = draftEvent.DeactivatedReason
	}
	updateFields["deactivated"] = draftEvent.Deactivated
	updateFields["comments"] = draftEvent.Comments
	updateFields["max_attendees"] = draftEvent.MaxAttendees
	updateFields["attendees"] = draftEvent.Attendees
	updateFields["sharable_groups"] = draftEvent.SharableGroups
	updateFields["updated_at"] = time.Now()

	updatorID, err := uuid.Parse(draftEvent.UpdatedBy)
	if err != nil {
		return nil, fmt.Errorf("invalid updater ID: %s", err.Error())
	}
	updateFields["updated_by"] = updatorID

	// Construct SQL query and parameters
	var placeholders []string
	var params []interface{}

	for field, value := range updateFields {
		placeholders = append(placeholders, fmt.Sprintf("%s = $%d", field, len(params)+1))
		if sliceValue, ok := value.([]string); ok {
			params = append(params, pq.Array(sliceValue))
		} else {
			params = append(params, value)
		}
	}

	sqlStr := fmt.Sprintf("UPDATE community.projects SET %s WHERE id = $%d",
		strings.Join(placeholders, ", "), len(params)+1)
	params = append(params, draftEvent.ID)

	_, err = tx.Exec(sqlStr, params...)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return draftEvent, nil
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
	FROM community.reports cr
	LEFT JOIN community.profiles cp on cp.id  = cr.created_by
	LEFT JOIN community.profiles up on up.id  = cr.updated_by
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
	INSERT INTO community.reports(project_id, subject, description, event_location, organizer_name, created_at, updated_at, created_by, updated_by, sharable_groups)
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

	sqlStr := `DELETE FROM community.reports WHERE id=$1`
	_, err = db.Exec(sqlStr, reportID)
	if err != nil {
		log.Printf("unable to delete report ID %+v", reportID)
		return err
	}
	return nil
}

// RetrieveEvent ...
func RetrieveEvent(user string, eventID uuid.UUID) (*model.Event, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := `
	SELECT ev.id,
       ev.title,
       ev.description,
       ev.cause,
	   CASE 
	   	WHEN ev.image_url IS NOT NULL THEN ENCODE(ev.image_url::bytea,'base64')
		ELSE ''
	   END AS base64,
       ev.street,
       ev.city,
       ev.state,
       ev.zip,
       ev.boundingbox,
       ev.class,
       ev.display_name,
       ev.importance,
       ev.lat,
       ev.licence,
       ev.lon,
       ev.osm_id,
       ev.osm_type,
       ev.place_id,
       ev.powered_by,
       ev.type,
       ev.project_type,
       ARRAY_AGG(COALESCE(ps.skill, '')) AS required_skills,
       ev.comments,
       ev.registration_link,
       ev.max_attendees,
       ev.attendees,
       ev.required_total_man_hours,
       ev.deactivated,
       ev.deactivated_reason,
       ev.start_date,
       ev.created_at,
       ev.created_by,
       COALESCE(cp.full_name, cp.username, cp.email_address) AS creator_name,
       ev.updated_at,
       ev.updated_by,
       COALESCE(up.full_name, up.username, up.email_address) AS updator_name,
       ev.sharable_groups
FROM community.projects ev
         LEFT JOIN community.project_skills ps ON ev.id = ps.project_id
         LEFT JOIN community.profiles cp ON ev.created_by = cp.id
         LEFT JOIN community.profiles up ON ev.updated_by = cp.id
WHERE ev.id = $1
GROUP BY ev.id, ev.updated_at, cp.full_name, cp.username, cp.email_address, up.full_name, up.username, up.email_address;
`
	row := db.QueryRow(sqlStr, eventID)

	var cause sql.NullString
	var imageURL sql.NullString
	var street sql.NullString
	var city sql.NullString
	var state sql.NullString
	var zip sql.NullString
	var boundingbox pq.StringArray
	var class sql.NullString
	var displayName sql.NullString
	var importance sql.NullString
	var lat sql.NullString
	var licence sql.NullString
	var lon sql.NullString
	var osmID sql.NullString
	var osmType sql.NullString
	var placeID sql.NullString
	var poweredBy sql.NullString
	var displayType sql.NullString
	var comments sql.NullString
	var required_skills pq.StringArray
	var registrationLink sql.NullString
	var maxAttendees sql.NullInt64
	var attendees pq.StringArray
	var deactivatedReason sql.NullString
	var startDate sql.NullTime
	var createdAt sql.NullTime
	var creator sql.NullString
	var updatedAt sql.NullTime
	var updater sql.NullString
	var sharableGroups pq.StringArray

	var event model.Event
	if err := row.Scan(&event.ID, &event.Title, &event.Description, &cause, &imageURL, &street, &city, &state, &zip, &boundingbox, &class, &displayName, &importance, &lat, &licence, &lon, &osmID, &osmType, &placeID, &poweredBy, &displayType, &event.ProjectType, &required_skills, &comments, &registrationLink, &maxAttendees, &attendees, &event.TotalManHours, &event.Deactivated, &deactivatedReason, &startDate, &createdAt, &event.CreatedBy, &creator, &updatedAt, &event.UpdatedBy, &updater, &sharableGroups); err != nil {
		return nil, err
	}

	event.Cause = cause.String
	event.ImageURL = imageURL.String
	event.Street = street.String
	event.City = city.String
	event.State = state.String
	event.ZipCode = zip.String
	event.BoundingBox = boundingbox
	event.Class = class.String
	event.DisplayName = displayName.String
	event.Importance = importance.String
	event.Lattitude = lat.String
	event.Longitude = lon.String
	event.OsmID = osmID.String
	event.OsmType = osmType.String
	event.PlaceID = placeID.String
	event.PoweredBy = poweredBy.String
	event.Type = displayType.String
	event.Comments = comments.String
	event.ProjectSkills = required_skills
	event.RegistrationLink = registrationLink.String
	event.MaxAttendees = int(maxAttendees.Int64)
	event.Attendees = attendees
	event.DeactivatedReason = deactivatedReason.String
	event.StartDate = startDate.Time
	event.CreatedAt = createdAt.Time
	event.CreatorName = creator.String
	event.UpdatedAt = updatedAt.Time
	event.UpdatorName = updater.String
	event.SharableGroups = sharableGroups

	return &event, nil
}

// RetrieveAllExpenses ...
func RetrieveAllExpenses(user string, eventID uuid.UUID) ([]model.Expense, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := `
	SELECT e.id,
        e.project_id,
        e.item_name,
        e.item_cost,
        e.category_id,
        cc.item_name AS category_name,
        e.purchase_location,
        e.notes,
        e.created_at,
        e.created_by,
        COALESCE(cp.full_name, cp.username, cp.email_address) AS creator_name,
        e.updated_at,
        e.updated_by,
        COALESCE(up.full_name, up.username, up.email_address) AS updator_name,
        e.sharable_groups
FROM community.expenses e
		LEFT JOIN community.category cc ON e.category_id = cc.id 
         LEFT JOIN community.profiles cp ON e.created_by = cp.id
         LEFT JOIN community.profiles up ON e.updated_by = up.id
WHERE e.project_id = $1
ORDER BY e.updated_at DESC;
`
	rows, err := db.Query(sqlStr, eventID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var draftExpenses []model.Expense

	for rows.Next() {
		var itemName sql.NullString
		var itemCost sql.NullString
		var categoryID sql.NullString
		var category sql.NullString
		var purchaseLocation sql.NullString
		var notes sql.NullString
		var creator sql.NullString
		var updater sql.NullString

		var sharableGroups pq.StringArray

		var expense model.Expense
		if err := rows.Scan(&expense.ID, &expense.EventID, &itemName, &itemCost, &categoryID, &category, &purchaseLocation, &notes, &expense.CreatedAt, &expense.CreatedBy, &creator, &expense.UpdatedAt, &expense.UpdatedBy, &updater, &sharableGroups); err != nil {
			return nil, err
		}

		expense.ItemName = itemName.String
		expense.ItemCost = itemCost.String
		expense.CategoryID = categoryID.String
		expense.Category = category.String
		expense.PurchaseLocation = purchaseLocation.String
		expense.Notes = notes.String
		expense.CreatorName = creator.String
		expense.UpdatorName = updater.String
		expense.SharableGroups = sharableGroups

		draftExpenses = append(draftExpenses, expense)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return draftExpenses, nil
}

// RetrieveVolunteerHours ...
func RetrieveVolunteerHours(user string, id uuid.UUID, columnNameToUpdate string) ([]model.VolunteeringDetails, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	var additionalSqlStr string
	var queryParams []interface{}

	if columnNameToUpdate == "eventID" {
		additionalSqlStr = " WHERE pv.project_id=$1"
		queryParams = append(queryParams, id)
	}
	if columnNameToUpdate == "userID" {
		additionalSqlStr = " WHERE pv.created_by=$1"
		queryParams = append(queryParams, id)
	}
	sqlStr := `
	SELECT pv.id,
	pv.user_id,
	pv.project_id,
	pj.title,
	pv.project_skills_id,
	ps.skill as skill_name,
	pv.volunteer_hours,
	pv.created_at,
	pv.updated_at,
	pv.created_by,
	pv.updated_by
FROM community.projects_volunteer pv
	  LEFT JOIN community.project_skills ps ON ps.id = pv.project_skills_id
	  LEFT JOIN community.projects pj ON ps.project_id = pj.id
	` + additionalSqlStr

	rows, err := db.Query(sqlStr, queryParams...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var data []model.VolunteeringDetails

	for rows.Next() {
		var event model.VolunteeringDetails
		if err := rows.Scan(
			&event.ID,
			&event.UserID,
			&event.EventID,
			&event.Title,
			&event.EventSkillsID,
			&event.VolunteeringActivity,
			&event.Hours,
			&event.CreatedAt,
			&event.UpdatedAt,
			&event.CreatedBy,
			&event.UpdatedBy,
		); err != nil {
			return nil, err
		}

		data = append(data, event)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	if len(data) == 0 {
		return make([]model.VolunteeringDetails, 0), nil
	}
	return data, nil
}

// SaveVolunteeringEvent ...
func SaveVolunteeringEvent(user string, draftEvent *model.VolunteeringDetails) (*model.VolunteeringDetails, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		return nil, err
	}

	sqlStr := `INSERT INTO 
	community.projects_volunteer
	(user_id, project_id, project_skills_id, volunteer_hours, created_at, created_by, updated_at, updated_by, sharable_groups)
	VALUES ($1, $2, 
	(select id from community.project_skills ps where ps.skill =$3 and ps.project_id = $2),
	$4, $5, $6, $7, $8, $9)
	RETURNING id, user_id, project_id, project_skills_id`

	userID, err := uuid.Parse(draftEvent.UserID)
	if err != nil {
		log.Printf("unable to parse userID. err: %+v", err)
		return nil, err
	}

	eventID, err := uuid.Parse(draftEvent.EventID)
	if err != nil {
		log.Printf("unable to parse eventID. err: %+v", err)
		return nil, err
	}

	var sharableGroups = make([]uuid.UUID, 0)
	sharableGroups = append(sharableGroups, userID)

	err = tx.QueryRow(
		sqlStr,
		userID,
		eventID,
		draftEvent.VolunteeringActivity,
		draftEvent.Hours,
		time.Now().UTC(),
		userID,
		time.Now().UTC(),
		userID,
		pq.Array(sharableGroups),
	).Scan(&draftEvent.ID, &draftEvent.CreatedBy, &draftEvent.EventID, &draftEvent.EventSkillsID)

	if err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return draftEvent, nil
}

// RetrieveAllStates ...
func RetrieveAllState(user string) ([]model.State, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := "SELECT id, name, abbreviation FROM community.states"
	rows, err := db.Query(sqlStr)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var data []model.State

	for rows.Next() {
		var d model.State
		if err := rows.Scan(&d.ID, &d.Name, &d.Abbreviation); err != nil {
			return nil, err
		}
		data = append(data, d)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return data, nil
}

// RetrieveAllEventCauses ...
func RetrieveAllEventCause(user string) ([]model.EventCause, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := "SELECT id, cause FROM community.event_causes"
	rows, err := db.Query(sqlStr)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var data []model.EventCause

	for rows.Next() {
		var ec model.EventCause
		if err := rows.Scan(&ec.ID, &ec.Cause); err != nil {
			return nil, err
		}
		data = append(data, ec)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return data, nil
}

// RetrieveAllProjectTypes ...
func RetrieveAllProjectType(user string) ([]model.ProjectType, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := "SELECT id, type FROM community.project_types"
	rows, err := db.Query(sqlStr)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var data []model.ProjectType

	for rows.Next() {
		var ec model.ProjectType
		if err := rows.Scan(&ec.ID, &ec.Type); err != nil {
			return nil, err
		}
		data = append(data, ec)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return data, nil
}

// RetrieveAllStorageLocation ...
func RetrieveAllStorageLocation(user string) ([]model.StorageLocation, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := "SELECT id, location, created_at, created_by, updated_at, updated_by, sharable_groups FROM community.storage_locations"
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

// RetrieveAllCategories ...
func RetrieveAllCategories(user string) ([]model.Category, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := "SELECT id, item_name, created_at, created_by, updated_at, updated_by, sharable_groups FROM community.category"
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
// adds new storage location if not existing
func addNewStorageLocation(user string, draftLocation string, created_by string, emptyLocationID *string) error {
	db, err := SetupDB(user)
	if err != nil {
		return err
	}
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		return err
	}

	sqlStr := `INSERT INTO community.storage_locations(location, created_by, updated_by, created_at, updated_at, sharable_groups) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`

	var sharableGroups = make([]uuid.UUID, 0)

	userID, err := uuid.Parse(created_by)
	if err != nil {
		tx.Rollback()
		return err
	}

	sharableGroups = append(sharableGroups, userID)

	row := tx.QueryRow(
		sqlStr,
		draftLocation,
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

	sqlStr := `INSERT INTO community.category(
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
