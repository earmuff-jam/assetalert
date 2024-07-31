
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

CREATE OR REPLACE FUNCTION community.handle_notification_from_items()
    RETURNS TRIGGER AS
$$
BEGIN
    -- Check if the operation is an INSERT or UPDATE
    IF TG_OP = 'INSERT' THEN
        INSERT INTO community.notifications (
            project_id,
            title,
            created_by,
            updated_by
        ) VALUES (
            NEW.project_id,
             'Added new ' || NEW.item_detail,
            NEW.created_by,
            NEW.updated_by
        );
    ELSEIF TG_OP = 'UPDATE' THEN
    	INSERT INTO community.notifications (
            project_id,
            title,
            created_by,
            updated_by
        ) VALUES (
            NEW.project_id,
             'Updated ' || NEW.item_detail,
            NEW.created_by,
            NEW.updated_by
        );
    ELSIF TG_OP = 'DELETE' THEN
        -- Delete all notifications with the corresponding project_id from items
        DELETE FROM community.notifications
        WHERE project_id = OLD.project_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


DROP TRIGGER IF EXISTS handle_notification_from_items_trigger ON community.items;

-- Create the new trigger for community.items
CREATE TRIGGER handle_notification_from_items_trigger
    AFTER INSERT OR UPDATE OR DELETE
    ON community.items
    FOR EACH ROW
    EXECUTE FUNCTION community.handle_notification_from_items();

ALTER TABLE community.notifications
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.notifications TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.notifications TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.notifications TO community_admin;
