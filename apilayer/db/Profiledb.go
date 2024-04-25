package db

import (
	"database/sql"
	"mime/multipart"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"github.com/mohit2530/communityCare/model"
)

// FetchUserProfile ...
func FetchUserProfile(user string, userID string) (*model.Profile, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := `SELECT 
	id,
	username,
	full_name,
	CASE 
		WHEN avatar_url IS NOT NULL THEN ENCODE(avatar_url::bytea,'base64')
 		ELSE ''
	END AS base64,
	email_address,
	phone_number,
	goal,
	about_me,
	onlinestatus,
	role
	FROM community.profiles
	WHERE id=$1
	`

	var draftProfile model.Profile

	var profileID sql.NullString
	var userName sql.NullString
	var fullName sql.NullString
	var avatarUrl sql.NullString
	var emailAddress sql.NullString
	var phoneNumber sql.NullString
	var goal sql.NullString
	var aboutMe sql.NullString
	var onlineStatus sql.NullBool
	var role sql.NullString

	rows, err := db.Query(sqlStr, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		if err := rows.Scan(&profileID, &userName, &fullName, &avatarUrl, &emailAddress, &phoneNumber, &goal, &aboutMe, &onlineStatus, &role); err != nil {
			return nil, err
		}
		draftProfile.ID, _ = uuid.Parse(profileID.String)
		draftProfile.Username = userName.String
		draftProfile.FullName = fullName.String
		draftProfile.AvatarUrl = avatarUrl.String
		draftProfile.EmailAddress = emailAddress.String
		draftProfile.PhoneNumber = phoneNumber.String
		draftProfile.Goal = goal.String
		draftProfile.AboutMe = aboutMe.String
		draftProfile.OnlineStatus = onlineStatus.Bool
		draftProfile.Role = role.String
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	draftProfile.Validate()
	return &draftProfile, nil
}

// UpdateUserProfile ...
func UpdateUserProfile(user string, userID string, draftProfile model.Profile) (*model.Profile, error) {
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
		UPDATE community.profiles 
		SET username=$2, full_name=$3, phone_number=$4, goal=$5, about_me=$6, onlinestatus=$7, role=$8
		WHERE id=$1
		RETURNING id, username, full_name, phone_number, goal, about_me, onlinestatus, role
	`

	var updatedProfile model.Profile

	row := tx.QueryRow(sqlStr,
		userID,
		draftProfile.Username,
		draftProfile.FullName,
		draftProfile.PhoneNumber,
		draftProfile.Goal,
		draftProfile.AboutMe,
		draftProfile.OnlineStatus,
		draftProfile.Role,
	)

	err = row.Scan(
		&updatedProfile.ID,
		&updatedProfile.Username,
		&updatedProfile.FullName,
		&updatedProfile.PhoneNumber,
		&updatedProfile.Goal,
		&updatedProfile.AboutMe,
		&updatedProfile.OnlineStatus,
		&updatedProfile.Role,
	)

	if err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	updatedProfile.Validate()
	return &updatedProfile, nil
}

// UpdateProfileAvatar ...
func UpdateProfileAvatar(user string, userID string, header *multipart.FileHeader, fileBytes []byte) (*model.Profile, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		return nil, err
	}

	var updatedProfile model.Profile

	sqlStr := `
		UPDATE community.profiles 
		SET avatar_url = $2
		WHERE id = $1
		RETURNING id, username, full_name, avatar_url, phone_number, goal, about_me, onlinestatus, role
	`

	var avatarUrl sql.NullString // Assuming avatar_url is a string column, not bytea
	var goal sql.NullString

	row := tx.QueryRow(sqlStr, userID, fileBytes)

	err = row.Scan(
		&updatedProfile.ID,
		&updatedProfile.Username,
		&updatedProfile.FullName,
		&avatarUrl,
		&updatedProfile.PhoneNumber,
		&goal,
		&updatedProfile.AboutMe,
		&updatedProfile.OnlineStatus,
		&updatedProfile.Role,
	)

	if err != nil {
		tx.Rollback()
		return nil, err
	}

	if avatarUrl.Valid {
		updatedProfile.AvatarUrl = avatarUrl.String
	} else {
		updatedProfile.AvatarUrl = ""
	}
	if goal.Valid {
		updatedProfile.Goal = goal.String
	} else {
		updatedProfile.Goal = ""
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	updatedProfile.Validate()
	return &updatedProfile, nil
}

// RetrieveRecentActivity ...
func RetrieveRecentActivity(user string, userID uuid.UUID) ([]model.RecentActivity, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := `
	SELECT 
	p.id AS project_id,
    p.title AS project_title,
    COALESCE(ps.volunteer_skills, NULL) AS volunteer_skills,
    COALESCE(pv.volunteer_hours, 0) AS volunteer_hours,
    COALESCE(e.expense_item_names, NULL) AS expense_item_names,
    COALESCE(e.expense_item_cost, 0) AS expense_item_cost,
	p.created_at,
    p.created_by,
    COALESCE (p2.username , p2.full_name, p2.email_address) as creator
FROM 
    community.projects p
LEFT JOIN (
    SELECT 
        pv.project_id,
        array_agg(DISTINCT skill) AS volunteer_skills,
		pv.updated_by
    FROM 
		community.projects_volunteer pv
    JOIN 
		community.project_skills ps ON pv.project_skills_id = ps.id
    WHERE 
        pv.created_by = $1
        OR pv.updated_by = $1
    GROUP BY 
        pv.project_id, pv.updated_by
) ps ON p.id = ps.project_id
LEFT JOIN (
    SELECT 
        project_id,
        SUM(volunteer_hours) AS volunteer_hours,
		updated_by
    FROM 
		community.projects_volunteer
    WHERE 
        created_by = $1
        OR updated_by = $1
    GROUP BY 
        project_id, updated_by
) pv ON p.id = pv.project_id
LEFT JOIN (
    SELECT 
        project_id,
        array_agg(DISTINCT item_name) AS expense_item_names,
        SUM(item_cost) AS expense_item_cost,
		updated_by
    FROM 
		community.expenses
    WHERE 
        created_by = $1
        OR updated_by = $1
    GROUP BY 
        project_id, updated_by
) e ON p.id = e.project_id
LEFT JOIN community.profiles p2 ON p.updated_by = p2.id 
WHERE 
    p.created_by = $1
    OR p.updated_by = $1
	OR e.updated_by = $1
	OR pv.updated_by = $1
ORDER BY p.updated_at DESC;
`

	rows, err := db.Query(sqlStr, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var recentActivities []model.RecentActivity

	for rows.Next() {
		var recentActivity model.RecentActivity
		var eventID sql.NullString
		var eventTitle sql.NullString
		var expenseItemNameList pq.StringArray
		var expenseItemCost sql.NullString
		var volunteeringHours sql.NullString
		var volunteeringActivityList pq.StringArray

		if err := rows.Scan(&eventID, &eventTitle, &volunteeringActivityList, &volunteeringHours, &expenseItemNameList, &expenseItemCost, &recentActivity.CreatedAt, &recentActivity.CreatedBy, &recentActivity.Creator); err != nil {
			return nil, err
		}

		recentActivity.EventID = eventID.String
		recentActivity.Title = eventTitle.String
		recentActivity.ExpenseName = expenseItemNameList
		recentActivity.ExpenseAmount = expenseItemCost.String
		recentActivity.VolunteeringSkill = volunteeringActivityList
		recentActivity.VolunteeringHours = volunteeringHours.String

		recentActivities = append(recentActivities, recentActivity)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return recentActivities, nil
}

// RetrieveUserActivityHighlights ...
func RetrieveUserActivityHighlights(user string, userID uuid.UUID) (*model.RecentHighlight, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := `SELECT
    COUNT(DISTINCT p.id) AS created_events,
    (
        SELECT COUNT(DISTINCT project_id)
        FROM community.projects_volunteer
        WHERE user_id = $1
    ) AS volunteered_events,
    (
        SELECT COUNT(r.*)
        FROM community.reports r
        WHERE r.created_by = $1
        AND r.updated_by = $1
    ) AS reported_events,
    (
        SELECT COUNT(e.*)
        FROM community.expenses e
        WHERE e.created_by = $1
        AND e.updated_by = $1
    ) AS expenses_reported,
    (
        SELECT COUNT(i.*)
        FROM community.items i
        WHERE i.created_by = $1
        AND i.updated_by = $1
    ) AS inventories_updated,
    COUNT(p.*) FILTER (WHERE p.deactivated) AS deactivated_events
FROM
    community.projects p
LEFT JOIN community.projects_volunteer pv ON
    p.id = pv.project_id
LEFT JOIN community.project_skills ps ON
    pv.project_skills_id = ps.id
WHERE
    p.created_by = $1
    AND p.updated_by = $1;`

	var recentHighlight model.RecentHighlight
	err = db.QueryRow(sqlStr, userID).Scan(&recentHighlight.CreatedEvents, &recentHighlight.VolunteeredEvents, &recentHighlight.ReportedEvents, &recentHighlight.ExpensesReported, &recentHighlight.InventoriesUpdated, &recentHighlight.DeactivatedEvents)
	if err != nil {
		return nil, err
	}

	return &recentHighlight, nil
}
