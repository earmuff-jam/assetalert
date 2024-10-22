
-- File: 0025_update_categories_table_community.up.sql
-- Description: Add new column to categories table


SET search_path TO community, public;

ALTER TABLE community.category
ADD COLUMN location POINT;
