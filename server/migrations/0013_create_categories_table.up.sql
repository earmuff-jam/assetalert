
-- File: 0013_create_categories_table.up.sql
-- Description: Create the expenses table

SET search_path TO community, public;

-- table category is used to stored all categories that an incurred expense can be grouped by --
-- sample category are created by the application. adding new category is allowed --

CREATE TABLE IF NOT EXISTS community.category
(
    id                  UUID PRIMARY KEY                                                                            NOT NULL DEFAULT gen_random_uuid(),
    name                VARCHAR(100)                                                                                NOT NULL,
    description         VARCHAR(500),
    color               VARCHAR(50),
    item_limit          INT                                                                                         NOT NULL DEFAULT 1, 
    created_by          UUID                         REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_by          UUID                         REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at          TIMESTAMP WITH TIME ZONE                                                                    NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMP WITH TIME ZONE                                                                    NOT NULL DEFAULT NOW(),
    sharable_groups     UUID[]
);

INSERT INTO community.category (name)
VALUES ('Groceries'),
       ('Utilities'),
       ('Rent/Mortgage'),
       ('Entertainment'),
       ('Transportation'),
       ('Clothing'),
       ('Home Maintenance'),
       ('Education'),
       ('Travel'),
       ('Miscellaneous');

COMMENT ON TABLE category IS 'consists of categories that the asset can be grouped against';

ALTER TABLE community.category
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.category TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.category TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.category TO community_admin;
