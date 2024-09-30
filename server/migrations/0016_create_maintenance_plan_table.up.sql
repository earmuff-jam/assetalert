
-- File: 0016_create_maintenance_plan_table.up.sql
-- Description: Create the maintenance plan table

SET search_path TO community, public;

CREATE TABLE IF NOT EXISTS community.maintenance_plan
(
    id                  UUID PRIMARY KEY                                                                                        NOT NULL DEFAULT gen_random_uuid(),
    name                VARCHAR(100)                                                                                            NOT NULL,
    description         VARCHAR(500),
    color               VARCHAR(50),
    status              UUID                         REFERENCES statuses (id) ON UPDATE CASCADE ON DELETE CASCADE,
    min_items_limit     INT                                                                                                     NOT NULL DEFAULT 1, 
    max_items_limit     INT                                                                                                     NOT NULL DEFAULT 1,
    plan_type           VARCHAR(100)                                                                                            NOT NULL DEFAULT 'annual',
    location            POINT,
    created_by          UUID                         REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at          TIMESTAMP WITH TIME ZONE                                                                                NOT NULL DEFAULT NOW(),
    updated_by          UUID                         REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_at          TIMESTAMP WITH TIME ZONE                                                                                NOT NULL DEFAULT NOW(),
    sharable_groups     UUID[]
);

COMMENT ON TABLE maintenance_plan IS 'consists of maintenance plan that the asset can be grouped against';

ALTER TABLE community.maintenance_plan
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.maintenance_plan TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.maintenance_plan TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.maintenance_plan TO community_admin;
