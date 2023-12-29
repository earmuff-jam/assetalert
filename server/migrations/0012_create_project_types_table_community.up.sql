
-- File: 0012_create_project_types_table_community.up.sql
-- Description: Create the project types table

CREATE TABLE IF NOT EXISTS project_types
(
    id   UUID PRIMARY KEY DEFAULT public.uuid_generate_v4(),
    type VARCHAR(255)
);

INSERT INTO project_types (type)
VALUES ('Community Development'),
       ('Education'),
       ('Healthcare'),
       ('Environmental Conservation'),
       ('Arts and Culture'),
       ('Technology and Innovation'),
       ('Social Services'),
       ('Youth and Education'),
       ('Animal Welfare'),
       ('Disaster Relief'),
       ('Sports and Recreation'),
       ('Civic Engagement'),
       ('Food and Nutrition'),
       ('Historical Preservation'),
       ('Elderly Care'),
       ('Housing and Homelessness'),
       ('Business and Entrepreneurship'),
       ('Scientific Research'),
       ('Religious and Spiritual'),
       ('Human Rights and Advocacy'),
       ('Other');

ALTER TABLE community.project_types
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.project_types TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.project_types TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.project_types TO community_admin;