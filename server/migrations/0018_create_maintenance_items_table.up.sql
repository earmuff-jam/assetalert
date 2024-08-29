
-- File: 0018_create_maintenance_item_table.up.sql
-- Description: Create the maintenance items table. Relationship between maintenance plans and asset is built here.

SET search_path TO community, public;

CREATE TABLE IF NOT EXISTS community.maintenance_item
(
    id                  UUID PRIMARY KEY                                                                                        NOT NULL DEFAULT gen_random_uuid(),
    maintenance_plan_id UUID                         REFERENCES maintenance_plan (id) ON UPDATE CASCADE ON DELETE CASCADE,
    item_id             UUID                         REFERENCES inventory (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_by          UUID                         REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at          TIMESTAMP WITH TIME ZONE                                                                                NOT NULL DEFAULT NOW(),
    updated_by          UUID                         REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_at          TIMESTAMP WITH TIME ZONE                                                                                NOT NULL DEFAULT NOW(),
    sharable_groups     UUID[]
);

COMMENT ON TABLE maintenance_item IS 'consists of assets that belong to a specific maintenance plan';

ALTER TABLE community.maintenance_item
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.maintenance_item TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.maintenance_item TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.maintenance_item TO community_admin;
