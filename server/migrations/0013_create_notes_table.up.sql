
-- File:0013_create_notes_table.up.sql
-- Description: Create notes table

SET search_path TO asset, public;
CREATE TABLE IF NOT EXISTS asset.notes
(
    id                  UUID PRIMARY KEY             NOT NULL DEFAULT gen_random_uuid(),
    title               VARCHAR(100)                 NOT NULL,
    description         VARCHAR(500),
    status              VARCHAR(100)                 NOT NULL,
    created_at          TIMESTAMP WITH TIME ZONE     NOT NULL DEFAULT NOW(),
    created_by          UUID                                                    REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_at          TIMESTAMP WITH TIME ZONE     NOT NULL DEFAULT NOW(),
    updated_by          UUID                                                    REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    sharable_groups     UUID[]
);

COMMENT ON TABLE notes IS 'written notes by the users';

ALTER TABLE asset.notes
    OWNER TO asset_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON asset.notes TO asset_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON asset.notes TO asset_test;
GRANT ALL PRIVILEGES ON TABLE asset.notes TO asset_admin;

