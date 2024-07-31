
-- File: 0002_create_auth_schema_community.up.sql
-- Description: Create the auth schema and grant permission to created roles.

CREATE SCHEMA auth;
GRANT USAGE ON SCHEMA auth TO public;
GRANT ALL PRIVILEGES ON SCHEMA auth TO auth_admin;