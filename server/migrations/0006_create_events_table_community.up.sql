
-- File: 0006_create_events_table_community.up.sql
-- Description: Create the events table

SET search_path TO community, public;

DROP TABLE IF EXISTS projects CASCADE;
CREATE TABLE IF NOT EXISTS projects
(
    id                       UUID PRIMARY KEY                  DEFAULT public.uuid_generate_v4(),
    title                    TEXT                     NOT NULL,
    description              TEXT,
    cause                    TEXT                     NOT NULL,
    image_url                BYTEA                    NULL,
    street                   TEXT,
    city                     TEXT,
    state                    TEXT,
    zip                      TEXT,
    boundingbox              TEXT,
    class                    TEXT,
    display_name             TEXT,
    importance               TEXT,
    lat                      TEXT,
    licence                  TEXT,
    lon                      TEXT,
    osm_id                   TEXT,
    osm_type                 TEXT,
    place_id                 TEXT,
    powered_by               TEXT,
    type                     TEXT,
    project_type             TEXT                     NOT NULL,
    comments                 TEXT,
    registration_link        TEXT,
    max_attendees            INT,
    attendees                UUID[]                   NOT NULL,
    required_total_man_hours INT                      NOT NULL,
    is_activated             TEXT                     NOT NULL DEFAULT true,
    deactivated_reason       TEXT                     NULL,
    start_date               TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at               TIMESTAMP WITH TIME ZONE          DEFAULT CURRENT_TIMESTAMP,
    updated_at               TIMESTAMP WITH TIME ZONE          DEFAULT CURRENT_TIMESTAMP,
    created_by               UUID                     NOT NULL,
    updated_by               UUID                     NOT NULL,
    sharable_groups          UUID[]                   NOT NULL
);

ALTER TABLE community.projects
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.projects TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.projects TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.projects TO community_admin;

COMMENT ON TABLE projects IS 'list of events in the system created by the user';