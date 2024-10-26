
-- File: 0027_update_maintenance_plan_item_relation_community.up.sql
-- Description: Update the maintenance plan item table with collaborators when maintenance plan is updated

SET search_path TO community, public;

DROP FUNCTION IF EXISTS community.update_maintenance_plan_item_collaborators_fn() CASCADE;
CREATE FUNCTION community.update_maintenance_plan_item_collaborators_fn()
    RETURNS trigger AS
$$
BEGIN
    UPDATE community.maintenance_item
        SET 
            updated_at = now(),
            updated_by = NEW.updated_by,
            sharable_groups = NEW.sharable_groups
        WHERE maintenance_plan_id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_maintenance_plan_item_collaborators_trigger ON community.maintenance_plan;
CREATE TRIGGER update_maintenance_plan_item_collaborators_trigger
    AFTER UPDATE
    ON community.maintenance_plan
    FOR EACH ROW
    EXECUTE FUNCTION community.update_maintenance_plan_item_collaborators_fn();
