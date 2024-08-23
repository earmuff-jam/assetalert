package db

import (
	"database/sql"

	"github.com/lib/pq"
	"github.com/mohit2530/communityCare/model"
)

// RetrieveAllAssetSummary ...
func RetrieveAllAssetSummary(user string, userID string) ([]model.AssetSummary, error) {
	db, err := SetupDB(user)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	sqlStr := `SELECT id, name, type, returnTime, price, category_id, plan_id, created_at, updated_at, sharable_groups FROM (
SELECT
    c.id,
    c.name,
    'C' as type,
    NULL::timestamp with time zone as returnTime,
	0 as price,
	ci.category_id as category_id,
	NULL as plan_id,
    c.created_at,
    c.updated_at,
	c.sharable_groups
FROM community.category c
LEFT JOIN community.category_item ci on c.id = ci.id
UNION
SELECT
    mp.id,
    mp.name,
    'M' as type,
    NULL::timestamp with time zone as returnTime,
	0 as price,
	NULL as category_id,
	mi.maintenance_plan_id as plan_id,
    mp.created_at,
    mp.updated_at,
	mp.sharable_groups
FROM community.maintenance_plan mp
LEFT JOIN community.maintenance_item mi on mp.id = mi.id
UNION
SELECT 
    i.id,
    i.name,
    'A' as type, 
    i.return_datetime as returnTime,
	i.price,
	NULL as category_id,
	NULL as plan_id,
    i.created_at,
    i.updated_at,
	i.sharable_groups
FROM community.inventory i
) AS combined
WHERE 
(type = 'A' AND (returnTime IS NULL OR returnTime < CURRENT_TIMESTAMP))
    OR type <> 'A'
AND $1::UUID = ANY(sharable_groups)
ORDER BY type, updated_at DESC;`

	rows, err := db.Query(sqlStr, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var data []model.AssetSummary

	for rows.Next() {
		var as model.AssetSummary
		var returnDateTime pq.NullTime
		var categoryID sql.NullString
		var maintenancePlanID sql.NullString
		var sharableGroups pq.StringArray
		if err := rows.Scan(&as.ID, &as.Name, &as.Type, &returnDateTime, &as.Price, &categoryID, &maintenancePlanID, &as.CreatedAt, &as.UpdatedAt, &sharableGroups); err != nil {
			return nil, err
		}

		if returnDateTime.Valid {
			as.ReturnTime = returnDateTime.Time
		}

		if categoryID.Valid {
			as.CategoryID = categoryID.String
		}

		if maintenancePlanID.Valid {
			as.PlanID = maintenancePlanID.String
		}

		as.SharableGroups = sharableGroups
		data = append(data, as)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return data, nil
}
