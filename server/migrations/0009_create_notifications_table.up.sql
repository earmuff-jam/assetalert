
-- -- File: 0009_create_notifications_table.up.sql
-- -- Description: Create the notifications table

-- SET search_path TO asset, public;
-- CREATE TABLE IF NOT EXISTS notifications
-- (
--     id                  UUID PRIMARY KEY         NOT NULL DEFAULT gen_random_uuid(),
--     asset_id            UUID                     NOT NULL REFERENCES asset (id) ON UPDATE CASCADE ON DELETE CASCADE,
--     title               VARCHAR(250)             NOT NULL,
--     isViewed            BOOLEAN                  NOT NULL DEFAULT false,
--     isResolved          BOOLEAN                  NOT NULL DEFAULT false,
--     created_by          UUID                     NOT NULL REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
--     updated_by          UUID                     NOT NULL REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
--     created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
--     updated_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
-- );

-- COMMENT ON TABLE notifications IS 'list of notifications for each user';

-- CREATE OR REPLACE FUNCTION asset.handle_notification_from_items()
--     RETURNS TRIGGER AS
-- $$
-- BEGIN
--     -- Check if the operation is an INSERT or UPDATE
--     IF TG_OP = 'INSERT' THEN
--         INSERT INTO asset.notifications (
--             asset_id,
--             title,
--             created_by,
--             updated_by
--         ) VALUES (
--             NEW.asset_id,
--              'Added new ' || NEW.item_detail,
--             NEW.created_by,
--             NEW.updated_by
--         );
--     ELSEIF TG_OP = 'UPDATE' THEN
--     	INSERT INTO asset.notifications (
--             asset_id,
--             title,
--             created_by,
--             updated_by
--         ) VALUES (
--             NEW.asset_id,
--              'Updated ' || NEW.item_detail,
--             NEW.created_by,
--             NEW.updated_by
--         );
--     ELSIF TG_OP = 'DELETE' THEN
--         -- Delete all notifications with the corresponding asset_id from items
--         DELETE FROM asset.notifications
--         WHERE asset_id = OLD.asset_id;
--     END IF;

--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;


-- DROP TRIGGER IF EXISTS handle_notification_from_items_trigger ON asset.items;

-- -- Create the new trigger for asset.items
-- CREATE TRIGGER handle_notification_from_items_trigger
--     AFTER INSERT OR UPDATE OR DELETE
--     ON asset.items
--     FOR EACH ROW
--     EXECUTE FUNCTION asset.handle_notification_from_items();

-- ALTER TABLE asset.notifications
--     OWNER TO asset_admin;

-- GRANT SELECT, INSERT, UPDATE, DELETE ON asset.notifications TO asset_public;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON asset.notifications TO asset_test;
-- GRANT ALL PRIVILEGES ON TABLE asset.notifications TO asset_admin;
