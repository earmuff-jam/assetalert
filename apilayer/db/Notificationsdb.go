package db

import (
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
    community.notifications n
LEFT JOIN community.projects p ON n.project_id = p.id
LEFT JOIN community.profiles cp ON n.created_by = cp.id
LEFT JOIN community.profiles up ON n.updated_by = up.id
WHERE
    n.created_by = $1
ORDER BY
    n.isviewed ASC
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
		// empty array to factor in for null
		return make([]model.Notification, 0), nil
	}
	return data, nil
}
