
SET SEARCH_PATH TO community, auth;

-- AUTHENTICATION --
INSERT INTO auth.users(email, role, encrypted_password, birthdate) values ('test@gmail.com', 'TESTER', '$2a$08$DtBpJRoDduzqR/ERz/JvFe2toYO9UhifP/.kmxdeamz0VmWr7kQuW', '2010-01-01');
INSERT INTO auth.question_answer (q1, a1, q2, a2, retries, email, created_by, updated_by) 
VALUES (
    'Which year did you graduate high school?',
    '1990',
    'Where did your parents first meet?',
    'Italy',
    1,
    'test@gmail.com',
    (SELECT id FROM community.profiles LIMIT 1),
    (SELECT id FROM community.profiles LIMIT 1)
);
INSERT INTO auth.question_pool (question) VALUES
    ('What was the name of your first pet?'),
    ('What is your mother’s maiden name?'),
    ('What is the name of the street you grew up on?'),
    ('What was your high school mascot?'),
    ('What was the name of your first school teacher?');

-- UPDATE PROFILE TABLE WITH USER DETAILS --
UPDATE community.profiles SET 
username = 'john',
full_name = 'John Doe',
phone_number = '1234567890',
about_me = 'I like to climb trees and hike with my friends'
WHERE email_address = 'test@gmail.com';

-- ADD STATUS SQL TEST DATA --
INSERT INTO community.statuses(name, description, color, created_by, updated_by, sharable_groups) 
VALUES ('draft', 'items under this bucket are in draft state', '#f7f7f7', (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY[(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
('archived', 'items under this bucket are archived', '#e7d3da', (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY[(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
('completed', 'items under this bucket are marked complete', '#963256', (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY[(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
('pending', 'items under this bucket are in pending state', '#c8aabf', (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY[(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
('urgent', 'items under this bucket require immediate attention', '#d433a7', (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY[(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
('general', 'items under this bucket are generalized items', '#d20a0a', (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY[(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
('on_hold', 'items under this bucket are on hold and needs more information', '#465760', (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY[(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
('cancelled', 'items under this bucket are cancelled and pending for deletion', '#28b391', (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY[(SELECT id FROM community.profiles p LIMIT 1)::UUID]);

-- ADD NOTES SQL TEST DATA --
INSERT INTO community.notes (title, description, status, color, location, created_by, updated_by, sharable_groups)
VALUES (
    'Buy kitty litter for four of my kittens',
    'Do not buy the brand from walmart, buy from a generic well known place',
    (SELECT id FROM community.statuses s LIMIT 1),
    '#2a6dbc',
     '(-72.625481, 42.203217)',
    (SELECT id FROM community.profiles p LIMIT 1),
    (SELECT id FROM community.profiles p LIMIT 1),
    ARRAY[(SELECT id FROM community.profiles p LIMIT 1)::UUID]
);

-- ADD CATGORIES SQL TEST DATA ---
INSERT INTO community.category (name, description, status, color, min_items_limit, max_items_limit, created_by, updated_by, sharable_groups)
VALUES ('Groceries', 'used for grocery related items', (SELECT id FROM community.statuses s LIMIT 1), '#d20a0a', 1, 100, (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
       ('Utilities', 'store boxes and utility related stuffs', (SELECT id FROM community.statuses s LIMIT 1), '#e7d3da', 1, 100, (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
       ('Entertainment', 'store gaming consoles, tvs, and / or any audio video equipment', (SELECT id FROM community.statuses s LIMIT 1), '#963256', 1, 100, (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
       ('Transportation', 'used to store bus pass, vehicle keys or any related accesories', (SELECT id FROM community.statuses s LIMIT 1), '#c8aabf', 1, 100, (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
       ('Clothing', 'used to keep track of all clothings including bags and pants', (SELECT id FROM community.statuses s LIMIT 1), '#d433a7', 1, 100, (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
       ('Home Maintenance', 'store tools such as belts, screwdrivers, nails etc', (SELECT id FROM community.statuses s LIMIT 1), '#465760', 1, 100, (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
       ('Education', 'used to store books and study materials', (SELECT id FROM community.statuses s LIMIT 1), '#138ed3', 1, 100, (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
       ('Miscellaneous', 'used to store stuffs that are totally random', (SELECT id FROM community.statuses s LIMIT 1), '#28b391', 1, 100, (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]);

-- ADD MAINTENANCE PLAN STATUS SQL TEST DATA --
INSERT INTO community.maintenance_status (name, description, created_by, updated_by, sharable_groups)
VALUES
    ('Ready for Review', 'The maintenance plan is ready to be reviewed by the appropriate person or team.', (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
    ('In Review', 'The maintenance plan is currently under review.', (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
    ('Passed Review', 'The maintenance plan has successfully passed the review process.', (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
    ('Failed Review', 'The maintenance plan did not pass the review process and requires adjustments.', (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
    ('Pending Approval', 'The maintenance plan is awaiting final approval before proceeding.', (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
    ('Approved', 'The maintenance plan has been approved and is ready for execution.', (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
    ('Rejected', 'The maintenance plan has been rejected and will not proceed.', (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]);

-- ADD MAINTENANCE PLAN SQL TEST DATA --
INSERT INTO community.maintenance_plan (name, description, maintenance_status, color, min_items_limit, max_items_limit, plan_type, location, created_by, updated_by, sharable_groups)
VALUES ('Daily maintenance plan', 'used to validate daily items', (SELECT id FROM community.maintenance_status mps LIMIT 1), '#d20a0a', 1, 100, 'annual',  '(-119.170898,  34.196411)', (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]),
       ('Weekly maintenance plan', 'used for weekely maintenance', (SELECT id FROM community.maintenance_status mps LIMIT 1), '#28b391', 1, 100, 'weekly',  '(-117.182541, 34.055569)', (SELECT id FROM community.profiles p LIMIT 1), (SELECT id FROM community.profiles p LIMIT 1), ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]);


-- ADD INVENTORIES SQL TEST DATA --
INSERT INTO community.inventory (name, description, price, status, barcode, sku, quantity, bought_at, location,
                                 storage_location_id, is_returnable, return_location, max_weight, min_weight,
                                 max_height, min_height, created_by, updated_by, sharable_groups)
VALUES ('4 pounds of kitty litter',
        'Bought from tractor supply in fm969',
        12.00,
        'DRAFT',
        'barcode#1123928',
        'sku#123456734',
        12,
        'Walmart',
        'Kitchen Pantry',
        (SELECT id from community.storage_locations WHERE location = 'Kitchen Pantry'),
        false,
        'amazon return',
        '12',
        '4',
        '20',
        '12',
        (SELECT id FROM community.profiles p LIMIT 1),
        (SELECT id FROM community.profiles p LIMIT 1),
        ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]);

-- ADD INVENTORIES SQL TEST DATA FOR NULL DATETIME --
INSERT INTO community.inventory (name, description, price, status, barcode, sku, quantity, bought_at, location,
                                 storage_location_id, is_returnable, return_location, max_weight, min_weight,
                                 max_height, min_height, created_by, updated_by, sharable_groups)
VALUES ('Dog food',
        '6 pounds of food bought from tractor supply',
        96.00,
        'HIDDEN',
        'barcode#1123928',
        'sku#123456734',
        1,
        'Walmart',
        'Utility Closet',
        (SELECT id from community.storage_locations WHERE location = 'Utility Closet'),
        false,
        'amazon return',
        '12',
        '4',
        '20',
        '12',
        (SELECT id FROM community.profiles p LIMIT 1),
        (SELECT id FROM community.profiles p LIMIT 1),
        ARRAY [(SELECT id FROM community.profiles p LIMIT 1)::UUID]);


-- ADD FAVOURITE ITEMS --
INSERT INTO community.favourite_items (category_id, created_by, updated_by, sharable_groups)
VALUES (
    (SELECT id FROM community.category c LIMIT 1),
    (SELECT id FROM community.profiles p LIMIT 1),
    (SELECT id FROM community.profiles p LIMIT 1),
    ARRAY[(SELECT id FROM community.profiles p LIMIT 1)]
);

INSERT INTO community.favourite_items (maintenance_plan_id, created_by, updated_by, sharable_groups)
VALUES (
    (SELECT id FROM community.maintenance_plan mp LIMIT 1),
    (SELECT id FROM community.profiles p LIMIT 1),
    (SELECT id FROM community.profiles p LIMIT 1),
    ARRAY[(SELECT id FROM community.profiles p LIMIT 1)]
);