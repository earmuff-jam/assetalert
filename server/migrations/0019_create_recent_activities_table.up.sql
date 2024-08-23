
-- File: 0019_create_recent_activities_table.up.sql
-- Description: Create the recent activities table. Populates values based on actions in the respective columns.

SET search_path TO community, public;

CREATE TABLE IF NOT EXISTS community.recent_activities
(
    id              UUID PRIMARY KEY         NOT NULL DEFAULT gen_random_uuid(),
    activity_id     UUID                     NOT NULL,
    type            CHAR                     NOT NULL, -- first letter of activity
    title           VARCHAR(500)             NOT NULL,
    custom_action   VARCHAR(100)             NOT NULL,
    created_by      UUID REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_by      UUID REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    sharable_groups UUID[]
);

COMMENT ON TABLE recent_activities IS 'list of items that are populated based on audience action';

ALTER TABLE community.recent_activities
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.recent_activities TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.recent_activities TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.recent_activities TO community_admin;
