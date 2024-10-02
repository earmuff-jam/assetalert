
-- File: 0023_update_table_maintenance_plan.up.sql
-- Description: Update maintenance plan table to support due date


SET search_path TO community, public;

ALTER TABLE community.maintenance_plan
ADD COLUMN plan_due TIMESTAMP WITH TIME ZONE NOT NULL;