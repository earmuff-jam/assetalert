
-- File: 0015_create_item_table_community.up.sql
-- Description: Create the item table

CREATE TABLE IF NOT EXISTS items
(
    id                  UUID PRIMARY KEY         NOT NULL DEFAULT gen_random_uuid(),
    project_id          UUID                     NOT NULL REFERENCES projects (id) ON UPDATE CASCADE ON DELETE CASCADE,
    storage_location_id UUID                     NOT NULL REFERENCES storage_locations (id) ON UPDATE CASCADE ON DELETE CASCADE,
    item_detail         VARCHAR(250)             NOT NULL,
    quantity            INT                      NOT NULL,
    unit_price          DECIMAL(10, 4)                    DEFAULT 0.00,
    bought_at           VARCHAR(250),
    item_description    VARCHAR(250),
    created_by          UUID                     NOT NULL REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_by          UUID                     NOT NULL REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE items IS 'list of items that belong to each unique storage location';

ALTER TABLE community.items
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.items TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.items TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.items TO community_admin;
