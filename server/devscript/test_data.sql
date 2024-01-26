
SET SEARCH_PATH TO community, auth;

-- AUTHENTICATION --
INSERT INTO auth.users(email, role, encrypted_password, birthdate) values ('test@gmail.com', 'TESTER', '$2a$08$DtBpJRoDduzqR/ERz/JvFe2toYO9UhifP/.kmxdeamz0VmWr7kQuW', '2010-01-01');

-- ADD EVENTS SQL TEST DATA --

INSERT INTO community.projects(title, description, cause, project_type, max_attendees, attendees, required_total_man_hours, deactivated, start_date, created_by, updated_by, sharable_groups)
values (
'SCFT Inventory List',
'South Carolina Football Team Inventory List',
'Community Cause ',
'Test Project Type',
100,
array [(select id from profiles p2 limit 1)::UUID],
250,
false,
now(),
(select id from community.community.profiles p limit 1),
(select id from community.community.profiles p limit 1),
array [(select id from profiles p2 limit 1)::UUID]
);


INSERT INTO community.projects(title, description, cause, project_type, max_attendees, attendees, required_total_man_hours, deactivated, start_date, created_by, updated_by, sharable_groups)
values (
'North Carolina Football Team',
'North Carolina football team',
'Environment Development',
'Test Project Type',
100,
array [(select id from profiles p2 limit 1)::UUID],
250,
false,
now(),
(select id from community.community.profiles p limit 1),
(select id from community.community.profiles p limit 1),
array [(select id from profiles p2 limit 1)::UUID]
);

-- since this is deactivated by default, you will not be able to see this event --
INSERT INTO community.projects(title, description, cause, project_type, max_attendees, attendees, required_total_man_hours, deactivated, start_date, created_by, updated_by, sharable_groups)
values (
'Worthington Football Team',
'Worthington Football Team',
'Community Cause',
'Community Development',
100,
array [(select id from profiles p2 limit 1)::UUID],
250,
true,
now(),
(select id from community.community.profiles p limit 1),
(select id from community.community.profiles p limit 1),
array [(select id from profiles p2 limit 1)::UUID]
);


-- ADD PROJECT SKILLS TO PROJECT TEST DATA --

INSERT INTO community.project_skills(project_id, skill, created_by, updated_by)
VALUES ((SELECT id FROM community.projects LIMIT 1),
        'Project Management',
        (SELECT id FROM community.profiles LIMIT 1),
        (SELECT id FROM community.profiles LIMIT 1));

INSERT INTO community.project_skills(project_id, skill, created_by, updated_by)
VALUES ((SELECT id FROM community.projects LIMIT 1),
        'Receptionist',
        (SELECT id FROM community.profiles LIMIT 1),
        (SELECT id FROM community.profiles LIMIT 1));

INSERT INTO community.project_skills(project_id, skill, created_by, updated_by)
VALUES ((SELECT id FROM community.projects LIMIT 1),
        'Electrician',
        (SELECT id FROM community.profiles LIMIT 1),
        (SELECT id FROM community.profiles LIMIT 1));


-- ADD VOLUNTEERING HOURS TO PROJECT TEST DATA --

INSERT INTO community.projects_volunteer(user_id, project_id, project_skills_id, volunteer_hours, created_at,
                                         updated_at, created_by, updated_by, sharable_groups)
VALUES ((SELECT id FROM community.profiles LIMIT 1),
        (SELECT id FROM community.projects LIMIT 1),
        (SELECT id FROM community.project_skills LIMIT 1),
        1,
        now(),
        now(),
        (SELECT id FROM community.profiles LIMIT 1),
        (SELECT id FROM community.profiles LIMIT 1),
        ARRAY [(select id from community.profiles p2 limit 1)::UUID]
        );

INSERT INTO community.projects_volunteer(user_id, project_id, project_skills_id, volunteer_hours, created_at,
                                         updated_at, created_by, updated_by, sharable_groups)
VALUES ((SELECT id FROM community.profiles LIMIT 1),
        (SELECT id FROM community.projects LIMIT 1),
        (SELECT id FROM community.project_skills LIMIT 1),
        3,
        now(),
        now(),
        (SELECT id FROM community.profiles LIMIT 1),
        (SELECT id FROM community.profiles LIMIT 1),
        ARRAY [(select id from community.profiles p2 limit 1)::UUID]
        );

INSERT INTO community.projects_volunteer(user_id, project_id, project_skills_id, volunteer_hours, created_at,
                                         updated_at, created_by, updated_by, sharable_groups)
VALUES ((SELECT id FROM community.profiles LIMIT 1),
        (SELECT id FROM community.projects LIMIT 1),
        (SELECT id FROM community.project_skills LIMIT 1),
        4,
        now(),
        now(),
        (SELECT id FROM community.profiles LIMIT 1),
        (SELECT id FROM community.profiles LIMIT 1),
        ARRAY [(select id from community.profiles p2 limit 1)::UUID]
        );


-- ADD ITEM SQL TEST DATA ---

INSERT INTO community.items (project_id, storage_location_id, item_detail, quantity, bought_at, item_description, created_by, updated_by) 
VALUES (
    (SELECT id FROM community.projects LIMIT 1),
    (SELECT id FROM community.storage_locations LIMIT 1),
    'Kitchen Knife',
    1,
    'Walmart',
    'Large kitchen knife to slice meat for dog food',
    (SELECT id FROM community.profiles p LIMIT 1),
    (SELECT id FROM community.profiles p LIMIT 1)
);

INSERT INTO community.items (project_id, storage_location_id, item_detail, quantity, bought_at, item_description, created_by, updated_by) 
VALUES (
    (SELECT id FROM community.projects LIMIT 1),
    (SELECT id FROM community.storage_locations LIMIT 1),
    'Kitchen Cutting Board',
    01,
    'Walmart',
    'Large kitchen board to support knife action',
    (SELECT id FROM community.profiles p LIMIT 1),
    (SELECT id FROM community.profiles p LIMIT 1)
);

INSERT INTO community.items (project_id, storage_location_id, item_detail, quantity, bought_at, item_description, created_by, updated_by) 
VALUES (
    (SELECT id FROM community.projects LIMIT 1),
    (SELECT id FROM community.storage_locations LIMIT 1),
    'Momo Cooking Utensils',
    04,
    'Indian Store',
    'Large Cooking Set from indian store',
    (SELECT id FROM community.profiles p LIMIT 1),
    (SELECT id FROM community.profiles p LIMIT 1)
);

INSERT INTO community.items (project_id, storage_location_id, item_detail, quantity, bought_at, item_description, created_by, updated_by) 
VALUES (
    (SELECT id FROM community.projects LIMIT 1),
    (SELECT id FROM community.storage_locations LIMIT 1),
    'Costco Air Fryer',
    01,
    'Walmart',
    'Ninja Air Fryer from Costco',
    (SELECT id FROM community.profiles p LIMIT 1),
    (SELECT id FROM community.profiles p LIMIT 1)
);

INSERT INTO community.items (project_id, storage_location_id, item_detail, quantity, bought_at, item_description, created_by, updated_by) 
VALUES (
    (SELECT id FROM community.projects LIMIT 1),
    (SELECT id FROM community.storage_locations LIMIT 1),
    'Costco Milk and Shake',
    01,
    'Costco',
    'Shaking jar from costco',
    (SELECT id FROM community.profiles p LIMIT 1),
    (SELECT id FROM community.profiles p LIMIT 1)
);

-- EXPENSES SQL TEST DATA ---

INSERT INTO community.expenses (event_id, item_name, item_cost, category_id, purchase_location, notes, created_by, updated_by, sharable_groups)
VALUES
    (
        (SELECT id from community.projects LIMIT 1),
        'Catering Services',
        500.00,
        (SELECT id FROM community.category LIMIT 1),
        'Local Caterers', 
        'Food for the event', 
        (SELECT id from community.profiles LIMIT 1),
        (SELECT id from community.profiles LIMIT 1), 
        ARRAY[(SELECT id from community.profiles LIMIT 1)::UUID]),

    (
        (SELECT id from community.projects LIMIT 1),
        'Venue Rental',
        1000.00,
        (SELECT id FROM community.category LIMIT 1),
        'City Hall', 
        'Renting space for the event', 
        (SELECT id from community.profiles LIMIT 1),
        (SELECT id from community.profiles LIMIT 1), 
        ARRAY[(SELECT id from community.profiles LIMIT 1)::UUID]),

    (
        (SELECT id from community.projects LIMIT 1),
        'Decorations', 
        200.00,
        (SELECT id FROM community.category LIMIT 1),
        'Party Supplies Co.', 
        'Decorations for the event', 
        (SELECT id from community.profiles LIMIT 1),
        (SELECT id from community.profiles LIMIT 1), 
        ARRAY[(SELECT id from community.profiles LIMIT 1)::UUID]),

    (
        (SELECT id from community.projects LIMIT 1),
        'Sound System Rental', 
        300.00, 
        (SELECT id FROM community.category LIMIT 1),
        'Audio Solutions', 
        'Renting sound equipment for the event', 
        (SELECT id from community.profiles LIMIT 1),
        (SELECT id from community.profiles LIMIT 1), 
        ARRAY[(SELECT id from community.profiles LIMIT 1)::UUID]),

    (
        (SELECT id from community.projects LIMIT 1),
        'Photography Services', 
        400.00, 
        (SELECT id FROM community.category LIMIT 1),
        'Capture Moments Studio', 
        'Hiring a photographer for the event', 
        (SELECT id from community.profiles LIMIT 1),
        (SELECT id from community.profiles LIMIT 1), 
        ARRAY[(SELECT id from community.profiles LIMIT 1)::UUID]),

    (
        (SELECT id from community.projects LIMIT 1),
        'Transportation', 
        150.00, 
        (SELECT id FROM community.category LIMIT 1),
        'City Limos', 
        'Transportation for guests', 
        (SELECT id from community.profiles LIMIT 1),
        (SELECT id from community.profiles LIMIT 1), 
        ARRAY[(SELECT id from community.profiles LIMIT 1)::UUID]),

    (
        (SELECT id from community.projects LIMIT 1),
        'Gifts for Attendees', 
        250.00, 
        (SELECT id FROM community.category LIMIT 1),
        'Gifts R Us', 
        'Small tokens of appreciation for attendees', 
        (SELECT id from community.profiles LIMIT 1),
        (SELECT id from community.profiles LIMIT 1), 
        ARRAY[(SELECT id from community.profiles LIMIT 1)::UUID]),

    (
        (SELECT id from community.projects LIMIT 1),
        'Event Staff Payment', 
        600.00, 
        (SELECT id FROM community.category LIMIT 1),
        'Event Services Agency', 
        'Payment for event staff', 
        (SELECT id from community.profiles LIMIT 1),
        (SELECT id from community.profiles LIMIT 1), 
        ARRAY[(SELECT id from community.profiles LIMIT 1)::UUID]),

    (
        (SELECT id from community.projects LIMIT 1),
        'Promotional Materials', 
        75.00, 
        (SELECT id FROM community.category LIMIT 1),
        'Print Shop', 
        'Printing flyers and banners', 
        (SELECT id from community.profiles LIMIT 1),
        (SELECT id from community.profiles LIMIT 1), 
        ARRAY[(SELECT id from community.profiles LIMIT 1)::UUID]),

    (
        (SELECT id from community.projects LIMIT 1),
        'Security Services', 
        350.00, 
        (SELECT id FROM community.category LIMIT 1),
        'Secure Events Co.', 
        'Hiring security personnel', 
        (SELECT id from community.profiles LIMIT 1),
        (SELECT id from community.profiles LIMIT 1), 
        ARRAY[(SELECT id from community.profiles LIMIT 1)::UUID])