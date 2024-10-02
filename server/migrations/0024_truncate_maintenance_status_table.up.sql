
-- File: 0024_truncate_maintenance_status_table.up.sql
-- Description: Truncates the maintenance status table since it is no longer used


SET search_path TO community, public;

TRUNCATE TABLE community.maintenance_status;
