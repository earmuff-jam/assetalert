
-- File: 0022_update_table_support_images.up.sql
-- Description: Update profiles, inventories, categories and maintenance plan tables to support images

SET search_path TO community, public;

ALTER TABLE community.profiles
ADD COLUMN associated_image_url TEXT;

ALTER TABLE community.inventory
ADD COLUMN associated_image_url TEXT;

ALTER TABLE community.category
ADD COLUMN associated_image_url TEXT;

ALTER TABLE community.maintenance_plan
ADD COLUMN associated_image_url TEXT;