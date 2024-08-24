
-- File: 0020_create_recent_activities_fn_triggers.up.sql
-- Description: Create the recent activities table functions and triggers.

SET search_path TO community, public;

--
-- categories triggers and functions
--

-- function updates recent activity table with new row when category is created --
DROP FUNCTION IF EXISTS community.create_recent_activities_categories_fn() CASCADE;
CREATE FUNCTION community.create_recent_activities_categories_fn()
    RETURNS trigger AS
$$
BEGIN
    INSERT INTO community.recent_activities (activity_id, type, title, custom_action, created_by, created_at, updated_by,
                                             updated_at, sharable_groups)
    VALUES (new.id, 'C', new.name, 'created', new.created_by, new.created_at, new.updated_by, new.updated_at,
            new.sharable_groups);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- trigger for create_recent_activities_categories_fn --
DROP TRIGGER IF EXISTS create_recent_activities_category_trigger ON community.category;
CREATE TRIGGER create_recent_activities_category_trigger
    AFTER INSERT
    ON community.category
    FOR EACH ROW
EXECUTE PROCEDURE community.create_recent_activities_categories_fn();

-- function updates recent activity table with new row when category is updated --
DROP FUNCTION IF EXISTS community.update_recent_activities_categories_fn() CASCADE;
CREATE FUNCTION community.update_recent_activities_categories_fn()
    RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO community.recent_activities (activity_id, type, title, custom_action, created_by, created_at, updated_by,
                                             updated_at, sharable_groups)
    VALUES (new.id, 'C', new.name, 'updated', new.created_by, new.created_at, new.updated_by, new.updated_at,
            new.sharable_groups);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- trigger for update_recent_activities_categories_fn --
DROP TRIGGER IF EXISTS update_recent_activities_category_trigger ON community.category;
CREATE TRIGGER update_recent_activities_category_trigger
    AFTER UPDATE
    ON community.category
    FOR EACH ROW
EXECUTE PROCEDURE community.update_recent_activities_categories_fn();

-- function updates recent activity table with new row when category is deleted --
DROP FUNCTION IF EXISTS community.delete_recent_activities_category_fn() CASCADE;
CREATE FUNCTION community.delete_recent_activities_category_fn()
    RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO community.recent_activities (activity_id, type, title, custom_action, created_by, created_at, updated_by,
                                             updated_at, sharable_groups)
    VALUES (old.id, 'C', old.name, 'deleted', old.created_by, old.created_at, old.updated_by, old.updated_at,
            old.sharable_groups);
    RETURN old;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- trigger for delete_recent_activities_category_fn --
DROP TRIGGER IF EXISTS delete_recent_activities_category_trigger ON community.category;
CREATE TRIGGER delete_recent_activities_category_trigger
    AFTER DELETE
    ON community.category
    FOR EACH ROW
EXECUTE PROCEDURE community.delete_recent_activities_category_fn();


-- 
-- maintenance plan functions and triggers
-- 
-- function updates recent activity table with new row when maintenance_plan is created --
DROP FUNCTION IF EXISTS community.create_recent_activities_maintenance_plan_fn() CASCADE;
CREATE FUNCTION community.create_recent_activities_maintenance_plan_fn()
    RETURNS trigger AS
$$
BEGIN
    INSERT INTO community.recent_activities (activity_id, type, title, custom_action, created_by, created_at, updated_by,
                                             updated_at, sharable_groups)
    VALUES (new.id, 'M', new.name, 'created', new.created_by, new.created_at, new.updated_by, new.updated_at,
            new.sharable_groups);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- trigger for create_recent_activities_maintenance_plan_fn --
DROP TRIGGER IF EXISTS create_recent_activities_maintenance_plan_trigger ON community.maintenance_plan;
CREATE TRIGGER create_recent_activities_maintenance_plan_trigger
    AFTER INSERT
    ON community.maintenance_plan
    FOR EACH ROW
EXECUTE PROCEDURE community.create_recent_activities_maintenance_plan_fn();

-- function updates recent activity table with new row when maintenance_plan is updated --
DROP FUNCTION IF EXISTS community.update_recent_activities_maintenance_plan_fn() CASCADE;
CREATE FUNCTION community.update_recent_activities_maintenance_plan_fn()
    RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO community.recent_activities (activity_id, type, title, custom_action, created_by, created_at, updated_by,
                                             updated_at, sharable_groups)
    VALUES (new.id, 'M', new.name, 'updated', new.created_by, new.created_at, new.updated_by, new.updated_at,
            new.sharable_groups);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- trigger for update_recent_activities_maintenance_plan_fn --
DROP TRIGGER IF EXISTS update_recent_activities_maintenance_plan_trigger ON community.maintenance_plan;
CREATE TRIGGER update_recent_activities_maintenance_plan_trigger
    AFTER UPDATE
    ON community.maintenance_plan
    FOR EACH ROW
EXECUTE PROCEDURE community.update_recent_activities_maintenance_plan_fn();

-- function updates recent activity table with new row when maintenance_plan is deleted --
DROP FUNCTION IF EXISTS community.delete_recent_activities_maintenance_plan_fn() CASCADE;
CREATE FUNCTION community.delete_recent_activities_maintenance_plan_fn()
    RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO community.recent_activities (activity_id, type, title, custom_action, created_by, created_at, updated_by,
                                             updated_at, sharable_groups)
    VALUES (old.id, 'M', old.name, 'deleted', old.created_by, old.created_at, old.updated_by, old.updated_at,
            old.sharable_groups);
    RETURN old;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- trigger for delete_recent_activities_maintenance_plan_fn --
DROP TRIGGER IF EXISTS delete_recent_activities_maintenance_plan_trigger ON community.maintenance_plan;
CREATE TRIGGER delete_recent_activities_maintenance_plan_trigger
    AFTER DELETE
    ON community.maintenance_plan
    FOR EACH ROW
EXECUTE PROCEDURE community.delete_recent_activities_maintenance_plan_fn();

-- 
-- asset triggers and functions
-- 
-- function updates recent activity table with new row when asset is created --
DROP FUNCTION IF EXISTS community.create_recent_activities_asset_fn() CASCADE;
CREATE FUNCTION community.create_recent_activities_asset_fn()
    RETURNS trigger AS
$$
BEGIN
    INSERT INTO community.recent_activities (activity_id, type, title, custom_action, created_by, created_at, updated_by,
                                             updated_at, sharable_groups)
    VALUES (new.id, 'A', new.name, 'created', new.created_by, new.created_at, new.updated_by, new.updated_at,
            new.sharable_groups);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- trigger for create_recent_activities_asset_fn --
DROP TRIGGER IF EXISTS create_recent_activities_asset_trigger ON community.inventory;
CREATE TRIGGER create_recent_activities_asset_trigger
    AFTER INSERT
    ON community.inventory
    FOR EACH ROW
EXECUTE PROCEDURE community.create_recent_activities_asset_fn();

-- function updates recent activity table with new row when asset is updated --
DROP FUNCTION IF EXISTS community.update_recent_activities_asset_fn() CASCADE;
CREATE FUNCTION community.update_recent_activities_asset_fn()
    RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO community.recent_activities (activity_id, type, title, custom_action, created_by, created_at, updated_by,
                                             updated_at, sharable_groups)
    VALUES (new.id, 'A', new.name, 'updated', new.created_by, new.created_at, new.updated_by, new.updated_at,
            new.sharable_groups);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- trigger for update_recent_activities_asset_fn --
DROP TRIGGER IF EXISTS update_recent_activities_asset_trigger ON community.inventory;
CREATE TRIGGER update_recent_activities_asset_trigger
    AFTER UPDATE
    ON community.inventory
    FOR EACH ROW
EXECUTE PROCEDURE community.update_recent_activities_asset_fn();

-- function updates recent activity table with new row when asset is deleted --
DROP FUNCTION IF EXISTS community.delete_recent_activities_asset_fn() CASCADE;
CREATE FUNCTION community.delete_recent_activities_asset_fn()
    RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO community.recent_activities (activity_id, type, title, custom_action, created_by, created_at, updated_by,
                                             updated_at, sharable_groups)
    VALUES (old.id, 'A', old.name, 'deleted', old.created_by, old.created_at, old.updated_by, old.updated_at,
            old.sharable_groups);
    RETURN old;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- trigger for delete_recent_activities_asset_fn --
DROP TRIGGER IF EXISTS delete_recent_activities_asset_trigger ON community.inventory;
CREATE TRIGGER delete_recent_activities_asset_trigger
    AFTER DELETE
    ON community.inventory
    FOR EACH ROW
EXECUTE PROCEDURE community.delete_recent_activities_asset_fn();