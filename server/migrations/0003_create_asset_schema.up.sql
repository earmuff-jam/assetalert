
-- File: 0003_create_asset_schema.up.sql
-- Description: Create the asset schema and grant permission to created roles.

CREATE SCHEMA asset;
GRANT USAGE ON SCHEMA asset TO asset_public;
GRANT USAGE ON SCHEMA asset TO asset_test;
GRANT ALL PRIVILEGES ON SCHEMA asset TO asset_admin;
