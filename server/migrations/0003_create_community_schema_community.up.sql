
-- File: 0003_create_community_schema_community.up.sql
-- Description: Create the community schema and grant permission to created roles.

CREATE SCHEMA community;
GRANT USAGE ON SCHEMA community TO community_public;
GRANT USAGE ON SCHEMA community TO community_test;
GRANT ALL PRIVILEGES ON SCHEMA community TO community_admin;
