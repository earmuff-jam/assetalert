
-- File: 0017_update_oauth_table.up.sql
-- Description: Update auth schema tables

SET search_path TO auth, public;

BEGIN;

ALTER TABLE auth.oauth
ADD COLUMN user_agent TEXT;

ALTER TABLE auth.users
ADD COLUMN birthdate TEXT;

END;