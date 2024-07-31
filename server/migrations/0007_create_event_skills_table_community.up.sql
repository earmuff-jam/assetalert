
-- File: 0007_create_event_skills_table_community.up.sql
-- Description: Create the event_skills table

CREATE TABLE IF NOT EXISTS project_skills
(
    id         UUID PRIMARY KEY         DEFAULT public.uuid_generate_v4(),
    project_id UUID REFERENCES projects (id) on update cascade on delete cascade,
    skill      TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    updated_by UUID NOT NULL
);

ALTER TABLE community.project_skills
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.project_skills TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.project_skills TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.project_skills TO community_admin;
