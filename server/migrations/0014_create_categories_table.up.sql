
-- File: 0013_create_categories_table.up.sql
-- Description: Create the categories table

SET search_path TO community, public;

CREATE TABLE IF NOT EXISTS community.category
(
    id                  UUID PRIMARY KEY                                                                            NOT NULL DEFAULT gen_random_uuid(),
    name                VARCHAR(100)                                                                                NOT NULL,
    description         VARCHAR(500),
    color               VARCHAR(50),
    status              UUID                         REFERENCES statuses (id) ON UPDATE CASCADE ON DELETE CASCADE,
    min_items_limit     INT                                                                                         NOT NULL DEFAULT 1, 
    max_items_limit     INT                                                                                         NOT NULL DEFAULT 1, 
    created_by          UUID                         REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_by          UUID                         REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at          TIMESTAMP WITH TIME ZONE                                                                    NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMP WITH TIME ZONE                                                                    NOT NULL DEFAULT NOW(),
    sharable_groups     UUID[]
);


COMMENT ON TABLE category IS 'consists of categories that the asset can be grouped against';

ALTER TABLE community.category
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.category TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.category TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.category TO community_admin;
