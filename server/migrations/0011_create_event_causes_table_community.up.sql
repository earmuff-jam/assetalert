
-- File: 0011_create_event_causes_table_community.up.sql
-- Description: Create the event causes table


CREATE TABLE IF NOT EXISTS event_causes
(
    id    UUID PRIMARY KEY DEFAULT public.uuid_generate_v4(),
    cause VARCHAR(255)
);

INSERT INTO event_causes (cause)
VALUES ('Celebrations'),
       ('Fundraising'),
       ('Awareness and Advocacy'),
       ('Education'),
       ('Networking'),
       ('Cultural Exchange'),
       ('Community Building'),
       ('Health and Fitness'),
       ('Entertainment'),
       ('Environmental Initiatives'),
       ('Support Groups'),
       ('Youth and Education'),
       ('Art and Creativity'),
       ('Food and Culinary'),
       ('Community Safety'),
       ('Technology and Innovation'),
       ('Social and Recreational Activities'),
       ('Political and Civic Engagement'),
       ('Volunteer and Charity Work'),
       ('Historical and Heritage Preservation'),
       ('Other');


ALTER TABLE community.event_causes
    OWNER TO community_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON community.event_causes TO community_public;
GRANT SELECT, INSERT, UPDATE, DELETE ON community.event_causes TO community_test;
GRANT ALL PRIVILEGES ON TABLE community.event_causes TO community_admin;