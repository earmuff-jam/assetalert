
SET SEARCH_PATH TO asset, auth;

-- AUTHENTICATION --
INSERT INTO auth.users(email, role, encrypted_password, birthdate) values ('test@gmail.com', 'TESTER', '$2a$08$DtBpJRoDduzqR/ERz/JvFe2toYO9UhifP/.kmxdeamz0VmWr7kQuW', '2010-01-01');

-- UPDATE PROFILE TABLE WITH USER DETAILS --

UPDATE asset.profiles SET 
username = 'john',
full_name = 'John Doe',
phone_number = '1234567890',
about_me = 'I like to climb trees and hike with my friends'
WHERE email_address = 'test@gmail.com';

INSERT INTO asset.inventory (name, description, price, status, barcode, sku, quantity, bought_at, location,
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
        (SELECT id from asset.storage_locations WHERE location = 'Utility Closet'),
        false,
        'amazon return',
        '12',
        '4',
        '20',
        '12',
        (SELECT id FROM asset.profiles p LIMIT 1),
        (SELECT id FROM asset.profiles p LIMIT 1),
        ARRAY [(SELECT id FROM asset.profiles p LIMIT 1)::UUID]);
