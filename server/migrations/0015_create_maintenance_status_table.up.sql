
-- File: 0015_create_maintenance_status_table.up.sql
-- Description: Create the maintenance status table

SET search_path TO community, public;

CREATE TABLE IF NOT EXISTS community.maintenance_status
(
    id                  UUID PRIMARY KEY                                                                            NOT NULL DEFAULT gen_random_uuid(),
    name                VARCHAR(100)                                                                                NOT NULL,
    description         VARCHAR(500),
    color               VARCHAR(50),
    created_by          UUID                         REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_by          UUID                         REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at          TIMESTAMP WITH TIME ZONE                                                                    NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMP WITH TIME ZONE                                                                    NOT NULL DEFAULT NOW(),
    sharable_groups     UUID[]
);

COMMENT ON TABLE maintenance_status IS 'consists of the list of statuses that can be associated with a selected maintenance plan';

ALTER TABLE community.maintenance_status
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.maintenance_status TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.maintenance_status TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.maintenance_status TO community_admin;

