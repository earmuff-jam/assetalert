
-- File: 0011_create_notes_table.up.sql
-- Description: Create notes table

SET search_path TO community, public;

-- status of the selected notes --
CREATE TYPE note_status AS ENUM (
    'draft', 
    'archived', 
    'completed', 
    'pending',
    'urgent', 
    'general', 
    'on_hold', 
    'cancelled'
);
CREATE TABLE IF NOT EXISTS community.notes
(
    id                  UUID PRIMARY KEY             NOT NULL DEFAULT gen_random_uuid(),
    title               VARCHAR(100)                 NOT NULL,
    description         VARCHAR(500),
    status              note_status                  NOT NULL DEFAULT 'general',
    color               VARCHAR(50),
    completionDate      TIMESTAMP WITH TIME ZONE,
    location            POINT,
    created_at          TIMESTAMP WITH TIME ZONE     NOT NULL DEFAULT NOW(),
    created_by          UUID                         REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_at          TIMESTAMP WITH TIME ZONE     NOT NULL DEFAULT NOW(),
    updated_by          UUID                         REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    sharable_groups     UUID[]
);

COMMENT ON TABLE notes IS 'notes table for audience members to quickly jot things down';

ALTER TABLE community.notes
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.notes TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.notes TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.notes TO community_admin;

