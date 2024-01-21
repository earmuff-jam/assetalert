
-- File: 0019_create_notifications_table_community.up.sql
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

-- -- trigger to update notification table if the change is in events table --

-- DROP FUNCTION IF EXISTS community.handle_notification_from_events_trigger() CASCADE;
-- CREATE FUNCTION community.handle_notification_from_events()
--     RETURNS TRIGGER AS
-- $$
-- BEGIN
--     INSERT INTO community.notifications (
--         id,
--         project_id,
--         title,
--         created_by,
--         updated_by
--         )
--     VALUES (
--         new.id,
--         new.email,
--         new.phone
--     );

-- RETURN NEW;
-- END;

-- $$ LANGUAGE plpgsql SECURITY DEFINER;

-- CREATE TRIGGER handle_notification_from_events_trigger
--     AFTER INSERT, UPDATE, DELETE
-- 	ON community.projects
--     FOR EACH ROW
-- EXECUTE PROCEDURE community.handle_notification_from_events();


-- -- trigger to update notification table if the change is in profiles table --

-- DROP FUNCTION IF EXISTS community.handle_notification_from_profiles_trigger() CASCADE;
-- CREATE FUNCTION community.handle_notification_from_profiles()
--     RETURNS TRIGGER AS
-- $$
-- BEGIN
--     INSERT INTO community.notifications (
--         id,
--         project_id,
--         title,
--         created_by,
--         updated_by
--         )
--     VALUES (
--         new.id,
--         new.email,
--         new.phone
--     );

-- RETURN NEW;
-- END;

-- $$ LANGUAGE plpgsql SECURITY DEFINER;

-- CREATE TRIGGER handle_notification_from_profiles_trigger
--     AFTER INSERT, UPDATE, DELETE
-- 	ON community.projects
--     FOR EACH ROW
-- EXECUTE PROCEDURE community.handle_notification_from_profiles();

ALTER TABLE community.notifications
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.notifications TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.notifications TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.notifications TO community_admin;
