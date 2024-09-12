
-- File: 0021_create_fav_items_table.up.sql
-- Description: Create the favourite items table.

SET search_path TO community, public;

CREATE TABLE IF NOT EXISTS community.favourite_items
(
    id                  UUID PRIMARY KEY         NOT NULL DEFAULT gen_random_uuid(),
    category_id         UUID REFERENCES category (id) ON UPDATE CASCADE ON DELETE CASCADE,
    maintenance_plan_id UUID REFERENCES maintenance_plan (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_by          UUID REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_by          UUID REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    sharable_groups     UUID[]
);

COMMENT ON TABLE favourite_items IS 'list of categories and maintenance plans that are pinned by the user';

ALTER TABLE community.favourite_items
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.favourite_items TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.favourite_items TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.favourite_items TO community_admin;
