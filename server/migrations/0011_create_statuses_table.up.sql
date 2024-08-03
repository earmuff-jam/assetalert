
-- File: 0011_create_statuses_table.up.sql
-- Description: Create statuses table

SET search_path TO community, public;

CREATE TABLE IF NOT EXISTS community.statuses
(
    id                  UUID PRIMARY KEY             NOT NULL DEFAULT gen_random_uuid(),
    name                VARCHAR(50)                  NOT NULL,
    description         VARCHAR(500)                 NULL,
    color               VARCHAR(50),           
    created_at          TIMESTAMP WITH TIME ZONE     NOT NULL DEFAULT NOW(),
    created_by          UUID                         REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_at          TIMESTAMP WITH TIME ZONE     NOT NULL DEFAULT NOW(),
    updated_by          UUID                         REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    sharable_groups     UUID[]
);

COMMENT ON TABLE statuses IS 'item status for any selected items within the application';

ALTER TABLE community.statuses
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.statuses TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.statuses TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.statuses TO community_admin;
