
-- File: 0006_create_profiles_table.up.sql
-- Description: Create the users profile table and grant permissions on the table.

SET search_path TO asset, public;
DROP TABLE IF EXISTS profiles CASCADE;
CREATE TABLE profiles
(
    id            uuid REFERENCES auth.users ON UPDATE CASCADE ON DELETE CASCADE NOT NULL PRIMARY KEY,
    updated_at    TIMESTAMP WITH TIME ZONE                                       NOT NULL DEFAULT NOW(),
    username      VARCHAR(50)                                                    NULL,
    full_name     VARCHAR(200)                                                   NULL,
    avatar_url    BYTEA                                                          NULL,
    email_address VARCHAR(250)                                                   NOT NULL   UNIQUE,
    phone_number  VARCHAR(250)                                                   NULL,
    goal          VARCHAR(250)                                                   NULL,
    about_me      VARCHAR(250)                                                   NULL,
    onlineStatus  BOOLEAN                                                                 DEFAULT FALSE,
    role          VARCHAR(10)                                                             DEFAULT 'USER'
        CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

ALTER TABLE asset.profiles
    OWNER TO asset_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON asset.profiles TO asset_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON asset.profiles TO asset_test;
GRANT ALL PRIVILEGES ON TABLE asset.profiles TO asset_admin;

DROP FUNCTION IF EXISTS asset.handle_new_user() CASCADE;
CREATE FUNCTION asset.handle_new_user()
    RETURNS trigger AS
$$
BEGIN
    INSERT INTO asset.profiles (id, email_address, phone_number)
    values (new.id, new.email, new.phone);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE PROCEDURE asset.handle_new_user();