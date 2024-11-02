-- File: 0006_create_profiles_table_community.up.sql
-- Description: Create the users profile table and grant permissions on the table.

SET search_path TO community, public;
DROP TABLE IF EXISTS profiles cascade;
CREATE TABLE profiles
(
    id            uuid REFERENCES auth.users ON UPDATE CASCADE ON DELETE CASCADE NOT NULL PRIMARY KEY,
    updated_at    TIMESTAMP WITH TIME ZONE                                       NOT NULL DEFAULT NOW(),
    username      VARCHAR(50)                                                    NULL,
    full_name     VARCHAR(200)                                                   NULL,
    avatar_url    BYTEA                                                          NULL,
    email_address VARCHAR(250)                                                   NOT NULL UNIQUE,
    phone_number  VARCHAR(250)                                                   NULL,
    about_me      VARCHAR(500)                                                   NULL,
    appearance    BOOLEAN                                                                 DEFAULT FALSE,
    grid_view     BOOLEAN                                                                 DEFAULT FALSE,
    onlineStatus  BOOLEAN                                                                 DEFAULT FALSE,
    role          VARCHAR(10)                                                             DEFAULT 'USER'
        CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

ALTER TABLE community.profiles
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.profiles TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.profiles TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.profiles TO community_admin;

DROP FUNCTION IF EXISTS community.handle_new_user() CASCADE;
CREATE FUNCTION community.handle_new_user()
    RETURNS trigger AS
$$
BEGIN
    INSERT INTO community.profiles (id, email_address, username, phone_number)
    VALUES (new.id, new.email, new.username, new.phone);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT
    ON auth.users
    FOR EACH ROW
EXECUTE PROCEDURE community.handle_new_user();