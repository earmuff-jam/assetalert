
-- File: 0021_create_expense_report_table_community.up.sql
-- Description: Create the expenses table

SET search_path TO community, public;

-- table category is used to stored all categories that an incurred expense can be grouped by --
-- sample category are created by the application. adding new category is allowed --

CREATE TABLE IF NOT EXISTS community.category
(
    id                  UUID PRIMARY KEY         NOT NULL DEFAULT gen_random_uuid(),
    item_name           VARCHAR(100)             NOT NULL,
    created_by      UUID                         REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_by      UUID                         REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at      TIMESTAMP WITH TIME ZONE     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE     NOT NULL DEFAULT NOW(),
    sharable_groups UUID[]
);

-- prefil category ---
INSERT INTO community.category (item_name)
VALUES ('Groceries'),
       ('Utilities'),
       ('Rent/Mortgage'),
       ('Entertainment'),
       ('Dining Out'),
       ('Transportation'),
       ('Healthcare'),
       ('Clothing'),
       ('Home Maintenance'),
       ('Education'),
       ('Travel'),
       ('Gifts/Donations'),
       ('Electronics'),
       ('Insurance'),
       ('Personal Care'),
       ('Miscellaneous');

COMMENT ON TABLE category IS 'category is incurred expenses that can be grouped on';

ALTER TABLE community.category
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.category TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.category TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.category TO community_admin;


-- table expenses is used to store all the incurred expenses for a select event --
CREATE TABLE IF NOT EXISTS community.expenses
(
    id                  UUID PRIMARY KEY         NOT NULL DEFAULT gen_random_uuid(),
    event_id            UUID                     NOT NULL REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE,
    item_name           VARCHAR(50)              NOT NULL,
    item_cost           NUMERIC(15, 2)           NOT NULL DEFAULT 0.00,
    category_id         UUID                     NOT NULL REFERENCES category(id) ON UPDATE CASCADE ON DELETE CASCADE,
    purchase_location   VARCHAR(50)              NULL,
    notes               TEXT                     NULL,
    created_by          UUID                     NOT NULL REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_by          UUID                     NOT NULL REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    sharable_groups     UUID[]                   NOT NULL
);

COMMENT ON TABLE expenses IS 'stores list of expenses for each event';

ALTER TABLE community.expenses
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.expenses TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.expenses TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.expenses TO community_admin;
