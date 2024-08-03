package db

import (
	"database/sql"
	"log"
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"github.com/mohit2530/communityCare/model"
)

// RetrieveNotes ...
func RetrieveNotes(user string, userID uuid.UUID) ([]model.Note, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := `SELECT 
	n.id,
	n.title, 
	n.description, 
	n.status,
	n.color,
	n.completionDate,
	n.location[0] AS lon, -- Extract longitude from POINT
	n.location[1] AS lat, -- Extract latitude from POINT
	n.created_at, 
	n.created_by, 
	COALESCE(cp.full_name, cp.username, cp.email_address) AS creator_name, 
	n.updated_at, 
	n.updated_by,
	COALESCE(up.full_name, up.username, up.email_address)  AS updater_name
	FROM community.notes n
	LEFT JOIN community.profiles cp on cp.id = n.created_by
	LEFT JOIN community.profiles up on up.id = n.updated_by
	WHERE n.created_by = $1 OR n.updated_by = $1 
	ORDER BY n.updated_at DESC`

	rows, err := db.Query(sqlStr, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var notes []model.Note

	for rows.Next() {
		var note model.Note
		var lon, lat sql.NullFloat64
		var completionDate sql.NullTime

		if err := rows.Scan(&note.ID, &note.Title, &note.Description, &note.Status, &note.Color, &completionDate, &lon, &lat, &note.CreatedAt, &note.CreatedBy, &note.Creator, &note.UpdatedAt, &note.UpdatedBy, &note.Updator); err != nil {
			return nil, err
		}

		if completionDate.Valid {
			note.CompletionDate = &completionDate.Time
		} else {
			note.CompletionDate = nil
		}

		if lon.Valid && lat.Valid {
			note.Location = model.Location{
				Lon: lon.Float64,
				Lat: lat.Float64,
			}
		}

		notes = append(notes, note)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return notes, nil
}

// AddNewNote ...
func AddNewNote(user string, userID string, draftNote model.Note) (*model.Note, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	addSqlStr := `
		INSERT INTO community.notes (title, description, color, completionDate, location, created_by, updated_by, sharable_groups) 
		VALUES ($1, $2, $3, $4, POINT($5, $6), $7, $8, $9) 
		RETURNING id;`

	parsedCreatorID, err := uuid.Parse(draftNote.UpdatedBy)
	if err != nil {
		return nil, err
	}

	var draftNoteID string
	draftNote.CreatedAt = time.Now()
	draftNote.UpdatedAt = time.Now()

	var sharableGroups = make([]uuid.UUID, 0)
	sharableGroups = append(sharableGroups, parsedCreatorID)

	tx, err := db.Begin()
	if err != nil {
		return nil, err
	}

	err = tx.QueryRow(
		addSqlStr,
		draftNote.Title,
		draftNote.Description,
		draftNote.Color,
		draftNote.CompletionDate,
		draftNote.Location.Lon,
		draftNote.Location.Lat,
		parsedCreatorID,
		parsedCreatorID,
		pq.Array(sharableGroups),
	).Scan(&draftNoteID)

	if err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	draftNote.ID = draftNoteID
	return &draftNote, nil
}

// UpdateNote ...
func UpdateNote(user string, userID string, draftNote model.Note) (*model.Note, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	updateSqlStr := "UPDATE community.notes SET title = $2, description = $3, status = $4, color = $5, updated_by = $6, updated_at = $7 WHERE id = $1  RETURNING id, title, description, status, color, created_at, created_by, updated_at, updated_by;"

	tx, err := db.Begin()
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	parsedCreatorID, err := uuid.Parse(draftNote.UpdatedBy)
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	var updatedNote model.Note

	row := tx.QueryRow(updateSqlStr,
		draftNote.ID,
		draftNote.Title,
		draftNote.Description,
		draftNote.Status,
		draftNote.Color,
		parsedCreatorID,
		time.Now(),
	)

	err = row.Scan(
		&updatedNote.ID,
		&updatedNote.Title,
		&updatedNote.Description,
		&updatedNote.Status,
		&updatedNote.Color,
		&updatedNote.CreatedAt,
		&updatedNote.CreatedBy,
		&updatedNote.UpdatedAt,
		&updatedNote.UpdatedBy,
	)

	if err != nil {
		tx.Rollback()
		return nil, err
	}
	if err := tx.Commit(); err != nil {
		return nil, err
	}
	return &updatedNote, nil
}

// RemoveNote ...
func RemoveNote(user string, draftNoteID string) error {
	db, err := SetupDB(user)
	if err != nil {
		return err
	}
	defer db.Close()

	sqlStr := `DELETE FROM community.notes WHERE id=$1`
	_, err = db.Exec(sqlStr, draftNoteID)
	if err != nil {
		log.Printf("unable to delete note ID %+v", draftNoteID)
		return err
	}
	return nil
}
