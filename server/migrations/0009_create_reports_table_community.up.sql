
-- File: 0009_create_reports_table_community.up.sql
-- Description: Create the reports table

CREATE TABLE IF NOT EXISTS reports
(
    id              UUID PRIMARY KEY         DEFAULT public.uuid_generate_v4(),
    project_id      UUID   NOT NULL,
    subject         TEXT   NOT NULL,
    description     TEXT   NOT NULL,
    event_location  TEXT   NOT NULL,
    organizer_name  TEXT   NOT NULL,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by      UUID   NOT NULL,
    updated_by      UUID   NOT NULL,
    sharable_groups UUID[] NOT NULL
);

ALTER TABLE community.reports
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.reports TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.reports TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.reports TO community_admin;

COMMENT ON TABLE reports IS 'list of reports for each project on the system';