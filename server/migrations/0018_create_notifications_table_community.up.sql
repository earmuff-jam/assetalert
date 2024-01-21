
-- File: 0018_create_notifications_table_community.up.sql
-- Description: Create the notifications table

SET search_path TO community, public;
CREATE TABLE IF NOT EXISTS notifications
(
    id                  UUID PRIMARY KEY         NOT NULL DEFAULT gen_random_uuid(),
    project_id          UUID                     NOT NULL REFERENCES projects (id) ON UPDATE CASCADE ON DELETE CASCADE,
    title               VARCHAR(250)             NOT NULL,
    isViewed            BOOLEAN                  NOT NULL DEFAULT false,
    isResolved          BOOLEAN                  NOT NULL DEFAULT false,
    created_by          UUID                     NOT NULL REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_by          UUID                     NOT NULL REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE notifications IS 'list of notifications for each user';

ALTER TABLE community.notifications
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.notifications TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.notifications TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.notifications TO community_admin;
