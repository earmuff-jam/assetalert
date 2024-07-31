
-- File: 0020_create_user_history_table.up.sql
-- Description: Create the user history table

SET search_path TO auth, public;
CREATE TABLE IF NOT EXISTS auth.user_auth_history
(
    id                  UUID PRIMARY KEY         NOT NULL DEFAULT gen_random_uuid(),
    user_id             UUID                     NOT NULL REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
    role                TEXT                     NOT NULL,
    email               TEXT                     NOT NULL,
    birthdate           TEXT                     NOT NULL,
    encrypted_password  TEXT                     NOT NULL,
    created_by          UUID                     NOT NULL REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_by          UUID                     NOT NULL REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE user_auth_history IS 'history table for user log in and sign up process';


CREATE OR REPLACE FUNCTION auth.update_user_auth_history_fn()
    RETURNS TRIGGER AS
$$
BEGIN
    IF TG_OP = 'INSERT' THEN
         INSERT INTO auth.user_auth_history (
            user_id,
            role,
            email,
            birthdate,
            encrypted_password,
            created_by,
            updated_by,
            updated_at
        ) VALUES (
            NEW.id,
            NEW.role,
            NEW.email,
            NEW.birthdate,
            NEW.encrypted_password,
            NEW.id,
            NEW.id,
            now()
        );
    ELSEIF TG_OP = 'UPDATE' THEN
        UPDATE auth.user_auth_history 
        SET updated_by = NEW.id
        WHERE user_id = NEW.id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS update_user_auth_history_trigger ON auth.users;

CREATE TRIGGER update_user_auth_history_trigger
    AFTER INSERT OR UPDATE
    ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION auth.update_user_auth_history_fn();

ALTER TABLE auth.user_auth_history
    OWNER TO asset_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON auth.user_auth_history TO asset_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON auth.user_auth_history TO asset_test;
GRANT ALL PRIVILEGES ON TABLE auth.user_auth_history TO asset_admin;
