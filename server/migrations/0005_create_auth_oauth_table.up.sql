
-- File: 0005_create_auth_oauth_table.up.sql
-- Description: Create the users oauth table and grant permissions on the table.

SET search_path TO auth, public;
CREATE TABLE auth.oauth
(
    id                          UUID                        NOT NULL DEFAULT public.uuid_generate_v4() PRIMARY KEY,
    token                       TEXT,
    user_id                     UUID                        NOT NULL UNIQUE,
    expiration_time             TIMESTAMP WITH TIME ZONE    NOT NULL DEFAULT now()
);

ALTER TABLE auth.oauth
    OWNER TO auth_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON auth.oauth TO public;
GRANT ALL PRIVILEGES ON TABLE auth.oauth TO auth_admin;