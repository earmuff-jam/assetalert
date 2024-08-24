-- File: 0017_create_category_items_table.up.sql
-- Description: Create the category items table. Relationship between category and asset is built here.

SET search_path TO community, public;

CREATE TABLE IF NOT EXISTS community.category_item
(
    id              UUID PRIMARY KEY         NOT NULL DEFAULT gen_random_uuid(),
    category_id     UUID REFERENCES category (id) ON UPDATE CASCADE ON DELETE CASCADE,
    item_id         UUID REFERENCES inventory (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_by      UUID REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_by      UUID REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    sharable_groups UUID[]
);

COMMENT ON TABLE category_item IS 'consists of assets that belong to a specific category';

ALTER TABLE community.category_item
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.category_item TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.category_item TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.category_item TO community_admin;
