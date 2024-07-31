
-- File: 0009_update_auth_table_community.up.sql
-- Description: Update auth.users table to store birthdate

SET search_path TO auth, public;

ALTER TABLE auth.users
ADD COLUMN birthdate TEXT;
