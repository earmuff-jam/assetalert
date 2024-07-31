
SET SEARCH_PATH TO community, auth;

-- AUTHENTICATION --
INSERT INTO auth.users(email, role, encrypted_password, birthdate) values ('test@gmail.com', 'TESTER', '$2a$08$DtBpJRoDduzqR/ERz/JvFe2toYO9UhifP/.kmxdeamz0VmWr7kQuW', '2010-01-01');

-- UPDATE PROFILE TABLE WITH USER DETAILS --
UPDATE community.profiles SET 
username = 'john',
full_name = 'John Doe',
phone_number = '1234567890',
about_me = 'I like to climb trees and hike with my friends'
WHERE email_address = 'test@gmail.com';

-- ADD NOTES SQL TEST DATA --
INSERT INTO community.notes (title, description, status, created_by, updated_by, sharable_groups)
VALUES (
    'Buy kitty litter for four of my kittens',
    'Do not buy the brand from walmart, buy from a generic well known place',
    '',
    (SELECT id FROM community.profiles p LIMIT 1),
    (SELECT id FROM community.profiles p LIMIT 1),
    ARRAY[(SELECT id FROM community.profiles p LIMIT 1)::UUID]
);

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
