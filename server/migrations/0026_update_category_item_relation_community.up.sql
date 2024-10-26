
-- File: 0026_update_category_item_relation_community.up.sql
-- Description: Update the category item table with collaborators when category is updated

SET search_path TO community, public;

DROP FUNCTION IF EXISTS community.update_category_item_collaborators_fn() CASCADE;
CREATE FUNCTION community.update_category_item_collaborators_fn()
    RETURNS trigger AS
$$
BEGIN
    UPDATE community.category_item
        SET 
            updated_at = now(),
            updated_by = NEW.updated_by,
            sharable_groups = NEW.sharable_groups
        WHERE category_id = NEW.id; 
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_category_item_collaborators_trigger ON community.category;
CREATE TRIGGER update_category_item_collaborators_trigger
    AFTER UPDATE
    ON community.category
    FOR EACH ROW
    EXECUTE FUNCTION community.update_category_item_collaborators_fn();
