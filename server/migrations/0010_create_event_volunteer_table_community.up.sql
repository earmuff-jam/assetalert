
-- File: 0010_create_event_volunteer_table_community.up.sql
-- Description: Create the event volunteer table

CREATE TABLE IF NOT EXISTS projects_volunteer
(
    id                UUID PRIMARY KEY         DEFAULT public.uuid_generate_v4(),
    user_id           UUID   NOT NULL REFERENCES community.profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    project_id        UUID   NOT NULL REFERENCES community.projects (id) ON UPDATE CASCADE ON DELETE CASCADE,
    project_skills_id UUID   NOT NULL REFERENCES community.project_skills (id) ON UPDATE CASCADE ON DELETE CASCADE,
    volunteer_hours   INT    NOT NULL,
    created_at        TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by        UUID   NOT NULL,
    updated_by        UUID   NOT NULL,
    sharable_groups   UUID[] NOT NULL
);

ALTER TABLE community.projects_volunteer
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.projects_volunteer TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.projects_volunteer TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.projects_volunteer TO community_admin;
