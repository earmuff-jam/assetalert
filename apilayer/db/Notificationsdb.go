package db

import (
	"time"

	"github.com/mohit2530/communityCare/model"
)

// RetrieveAllNotifications ...
func RetrieveAllNotifications(user string, userID string) ([]model.Notification, error) {

	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := `SELECT
    n.id,
    n.project_id,
    n.title,
    n.isviewed,
    n.isresolved,
    n.created_by,
    COALESCE(cp.username, cp.full_name, cp.email_address) AS creator_name,
    n.created_at,
    n.updated_by,
    COALESCE(up.username, up.full_name, up.email_address) AS updater_name,
    n.updated_at
FROM
    asset.notifications n
LEFT JOIN asset.projects p ON n.project_id = p.id
LEFT JOIN asset.profiles cp ON n.created_by = cp.id
LEFT JOIN asset.profiles up ON n.updated_by = up.id
WHERE
    n.created_by = $1
ORDER BY
    n.created_at  DESC , n.isviewed ASC
LIMIT 10;
	`
	rows, err := db.Query(sqlStr, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var data []model.Notification

	for rows.Next() {
		var notification model.Notification

		if err := rows.Scan(
			&notification.ID,
			&notification.EventID,
			&notification.Title,
			&notification.IsViewed,
			&notification.IsResolved,
			&notification.CreatedBy,
			&notification.CreatorName,
			&notification.CreatedAt,
			&notification.UpdatedBy,
			&notification.UpdaterName,
			&notification.UpdatedAt,
		); err != nil {
			return nil, err
		}
		data = append(data, notification)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	if len(data) == 0 {
		return make([]model.Notification, 0), nil
	}
	return data, nil
}

// UpdateSelectedNotification ...
func UpdateSelectedNotification(user string, userID string, draftNotification model.Notification) (*model.Notification, error) {

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
	UPDATE asset.notifications 
	SET isviewed = $2, isresolved = $3, updated_by = $4, updated_at = $5
	WHERE id = $1 
	RETURNING id, project_id, title, isviewed, isresolved, created_by, created_at, updated_by, updated_at;
	`

	var updatedNotification model.Notification

	row := tx.QueryRow(sqlStr,
		draftNotification.ID,
		draftNotification.IsViewed,
		draftNotification.IsResolved,
		draftNotification.UpdatedBy,
		time.Now(),
	)

	err = row.Scan(
		&updatedNotification.ID,
		&updatedNotification.EventID,
		&updatedNotification.Title,
		&updatedNotification.IsViewed,
		&updatedNotification.IsResolved,
		&updatedNotification.CreatedBy,
		&updatedNotification.CreatedAt,
		&updatedNotification.UpdatedBy,
		&updatedNotification.UpdatedAt,
	)

	if err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return &updatedNotification, nil
}
