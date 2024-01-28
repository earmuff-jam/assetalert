
-- File: 0022_add_notification_trigger_for_expense_report_community.up.sql
-- Description: Create the trigger to update notifications when new expense is added

SET search_path TO community, public;

CREATE OR REPLACE FUNCTION community.handle_notifications_from_expenses_table()
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
            'Added new ' || NEW.item_name,
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
             'Updated ' || NEW.item_name,
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

-- Create the new trigger for community.expenses
DROP TRIGGER IF EXISTS handle_notifications_from_expenses_table_trigger ON community.expenses;
CREATE TRIGGER handle_notifications_from_expenses_table_trigger
    AFTER INSERT OR UPDATE OR DELETE
    ON community.expenses
    FOR EACH ROW
    EXECUTE FUNCTION community.handle_notifications_from_expenses_table();