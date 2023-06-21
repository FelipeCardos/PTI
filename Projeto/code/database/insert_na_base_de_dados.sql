-- Insert data into Address table
INSERT INTO
  Address (country, state, street, postal_code)
VALUES
  (
    'United States',
    'California',
    '123 Main Street',
    '90001'
  ),
  (
    'United States',
    'New York',
    '456 Elm Avenue',
    '10001'
  ),
  (
    'United States',
    'Texas',
    '789 Oak Road',
    '75001'
  ),
  (
    'United Kingdom',
    'London',
    '10 Downing Street',
    'SW1A 2AA'
  ),
  ('Canada', 'Ontario', '321 Maple Lane', 'M1R 2T3'),
  (
    'Australia',
    'New South Wales',
    '555 Beach Street',
    '2000'
  ),
  ('Germany', 'Berlin', '999 Parkweg', '10115'),
  ('France', 'Paris', '777 Rue de la Paix', '75002');

-- Insert data into User table
INSERT INTO
  User (
    name,
    email,
    password,
    fiscal_identifier,
    address_id,
    phone,
    typeUser
  )
VALUES
  (
    'John Doe',
    'johndoe@example.com',
    '$2a$14$UJ9XCBatoicb5fJ7/UPE.OvJ.Ij/dAd0rPZVgNJnnx2wPKCoyzAle',
    '1234567890',
    1,
    '+1 123-456-7890',
    'Consumer'
  ),
  (
    'Jane Smith',
    'janesmith@example.com',
    '$2a$14$4u96jzaQkjleu5hLtaSYj.2fWdTYkh9H1kA0TjXJOhro0sytzX2gW',
    '9876543210',
    2,
    '+1 987-654-3210',
    'Producer'
  ),
  (
    'David Johnson',
    'davidjohnson@example.com',
    '$2a$14$VV8NIBGU65WHCoogFGReLOUDTi36G5bE08l4gBrmtn6jjIRjave8u',
    '2468135790',
    3,
    '+1 246-813-5790',
    'Consumer'
  ),
  (
    'Emily Brown',
    'emilybrown@example.com',
    '$2a$14$ARoCYsW0zGG2VfvTKgLfLejKur1zrdzWyMx07KFqZEPIBZLC76FQK',
    '1357924680',
    4,
    '+1 135-792-4680',
    'Producer'
  ),
  (
    'Michael Wilson',
    'michaelwilson@example.com',
    '$2a$14$PS2pOazPPUWgJU.EAa3hXen1beSMNZSmm7tCFQPEuYlzN2YZUi0Qi',
    '5678901234',
    5,
    '+1 567-890-1234',
    'Consumer'
  ),
  (
    'Sarah Davis',
    'sarahdavis@example.com',
    '$2a$14$7Rau1EBfbpdpyzcqQpd8vOjdFmdYbe9DlrJFFzExiyUmgpfRQ99fe',
    '4321098765',
    6,
    '+1 432-109-8765',
    'Producer'
  ),
  (
    'Christopher Lee',
    'christopherlee@example.com',
    '$2a$14$sWeXb7KotoDLUEOOXWXfYedRnOhaQTagh3evcPxnuk/RatdP4RW46',
    '9012345678',
    7,
    '+1 901-234-5678',
    'Consumer'
  ),
  (
    'Olivia Taylor',
    'oliviataylor@example.com',
    '$2a$14$BxMilgFqJtYhYoNG6A5lp.i4U00SWDphTGAdNP1BmEwJx8SXORNyK',
    '',
    8,
    '+1 975-310-8642',
    'Admin'
  );

-- Insert data into Credentials table
-- Insert data into ProductionUnit table
INSERT INTO
  ProductionUnit (id, producer_id, capacity, address_id)
VALUES
  (1, 2, 100, 1),
  (2, 2, 200, 2),
  (3, 4, 150, 3),
  (4, 4, 120, 4),
  (5, 6, 180, 5),
  (6, 6, 250, 6),
  (7, 6, 300, 7),
  (8, 6, 220, 8);

-- Insert data into Vehicle table
INSERT INTO
  Vehicle (
    id,
    production_unit_id,
    producer_id,
    license_plate,
    capacity
  )
VALUES
  (1, 1, 2, 'ABC123', 50),
  (2, NULL, 4, 'DEF456', 70),
  (3, 3, 4, 'GHI789', 60),
  (4, 5, 6, 'JKL012', 80),
  (5, 5, 6, 'MNO345', 90),
  (6, NULL, 6, 'PQR678', 75),
  (7, 6, 6, 'STU901', 100),
  (8, 8, 6, 'VWX234', 110);

-- Insert data into Product table
INSERT INTO
  Product (
    name,
    description,
    barcode_id,
    producer_id,
    price,
    production_date
  )
VALUES
  -- Electronics
  (
    'Smart TV',
    'High-definition smart TV with built-in streaming services',
    '1234567890123',
    4,
    100000,
    '2022-01-15 09:30:00'
  ),
  (
    'Bluetooth Speaker',
    'Portable wireless speaker with 10-hour battery life',
    '2345678901234',
    2,
    8000,
    '2022-03-22 14:45:00'
  ),
  (
    'Laptop',
    'Powerful laptop with Intel Core i7 processor and 16GB RAM',
    '3456789012345',
    6,
    150000,
    '2022-02-10 11:20:00'
  ),
  -- Clothing
  (
    'T-Shirt',
    'Comfortable cotton t-shirt for everyday wear',
    '4567890123456',
    2,
    2000,
    '2022-04-05 16:10:00'
  ),
  (
    'Jeans',
    'Classic denim jeans with a relaxed fit',
    '5678901234567',
    4,
    5000,
    '2022-03-01 13:00:00'
  ),
  (
    'Dress',
    'Elegant evening dress for special occasions',
    '6789012345678',
    6,
    10000,
    '2022-05-18 10:05:00'
  ),
  -- Home & Kitchen
  (
    'Coffee Maker',
    'Automatic coffee maker with programmable timer',
    '7890123456789',
    6,
    6000,
    '2022-02-28 08:15:00'
  ),
  (
    'Blender',
    'Powerful blender for making smoothies and shakes',
    '8901234567890',
    2,
    4000,
    '2022-03-14 15:55:00'
  ),
  (
    'Cookware Set',
    'Complete set of high-quality non-stick cookware',
    '9012345678901',
    4,
    15000,
    '2022-01-05 12:45:00'
  ),
  -- Computers
  (
    'Gaming PC',
    'High-performance gaming PC with NVIDIA RTX graphics card',
    '0123456789012',
    4,
    200000,
    '2022-05-10 09:25:00'
  ),
  (
    'Monitor',
    '27-inch LED monitor with IPS panel and Full HD resolution',
    '1234567890123',
    2,
    30000,
    '2022-02-15 14:30:00'
  ),
  (
    'Keyboard',
    'Mechanical gaming keyboard with customizable RGB lighting',
    '2345678901234',
    6,
    12000,
    '2022-04-20 11:50:00'
  ),
  -- Mobile Phones
  (
    'Smartphone',
    'Flagship smartphone with high-resolution display and dual cameras',
    '3456789012345',
    6,
    80000,
    '2022-03-05 10:40:00'
  ),
  (
    'Wireless Earbuds',
    'True wireless earbuds with noise cancellation feature',
    '4567890123456',
    4,
    10000,
    '2022-05-12 16:20:00'
  ),
  (
    'Power Bank',
    'Portable power bank with fast charging capability',
    '5678901234567',
    2,
    3000,
    '2022-01-30 13:15:00'
  ),
  -- Tops
  (
    'Tank Top',
    'Sleeveless cotton tank top for summer',
    '6789012345678',
    2,
    1500,
    '2022-04-08 11:35:00'
  ),
  (
    'Turtleneck Sweater',
    'Warm and cozy turtleneck sweater for winter',
    '7890123456789',
    4,
    5000,
    '2022-02-25 08:55:00'
  ),
  (
    'Button-up Shirt',
    'Classic button-up shirt for formal occasions',
    '8901234567890',
    6,
    3500,
    '2022-03-18 15:15:00'
  ),
  -- Bottoms
  (
    'Shorts',
    'Casual shorts for outdoor activities',
    '9012345678901',
    6,
    2500,
    '2022-01-20 12:05:00'
  ),
  (
    'Leggings',
    'Comfortable and stretchy leggings for workouts',
    '0123456789012',
    4,
    3000,
    '2022-04-02 09:40:00'
  ),
  (
    'Jeans',
    'Slim-fit jeans with distressed details',
    '1234567890123',
    2,
    4000,
    '2022-05-15 14:15:00'
  ),
  -- Appliances
  (
    'Refrigerator',
    'Energy-efficient refrigerator with spacious storage',
    '2345678901234',
    2,
    80000,
    '2022-03-08 10:25:00'
  ),
  (
    'Washing Machine',
    'Front-loading washing machine with multiple wash programs',
    '3456789012345',
    4,
    60000,
    '2022-05-24 16:50:00'
  ),
  (
    'Air Conditioner',
    'Split air conditioner with remote control and adjustable temperature',
    '4567890123456',
    6,
    90000,
    '2022-02-18 13:30:00'
  ),
  -- Furniture
  (
    'Sofa',
    'Comfortable and stylish sofa for the living room',
    '5678901234567',
    6,
    100000,
    '2022-04-15 11:10:00'
  ),
  (
    'Dining Table',
    'Solid wood dining table with seating for six',
    '6789012345678',
    4,
    50000,
    '2022-02-28 08:40:00'
  ),
  (
    'Bed',
    'Queen-sized bed frame with upholstered headboard',
    '7890123456789',
    2,
    80000,
    '2022-05-05 15:20:00'
  );

-- Insert data into ProductImage table
INSERT INTO
  ProductImage (product_id, uri)
VALUES
  (1, 'https://i.imgur.com/riu92Vf.jpg'),
  (2, 'https://i.imgur.com/hvmPEvO.jpg'),
  (3, 'https://i.imgur.com/yUuJLnA.jpg'),
  (4, 'https://i.imgur.com/4jFawpJ.jpg'),
  (5, 'https://i.imgur.com/nQzCkE7.jpg'),
  (6, 'https://i.imgur.com/6WzUCZl.jpg'),
  (7, 'https://i.imgur.com/Lc03GwG.jpg'),
  (8, 'https://i.imgur.com/eGkFB3i.jpg'),
  (9, 'https://i.imgur.com/rVu7ldQ.jpg'),
  (10, 'https://i.imgur.com/O2Rh7Hh.jpg'),
  (
    11,
    'https://i.imgur.com/TzUXyMC.jpg'
  ),
  (12, 'https://i.imgur.com/cEgotXc.jpg'),
  (13, 'https://i.imgur.com/uF9UzQC.jpg'),
  (14, 'https://i.imgur.com/dIV0gPr.jpg'),
  (15, 'https://i.imgur.com/nyku3a3.jpg'),
  (16, 'https://i.imgur.com/vjKNGkf.jpg'),
  (17, 'https://i.imgur.com/2Q8cAVG.jpg'),
  (18, 'https://i.imgur.com/nuVpPOO.jpg'),
  (19, 'https://i.imgur.com/lYCGLdo.jpg'),
  (20, 'https://i.imgur.com/idW6iE9.jpg');

INSERT INTO
  ProductProductionUnit (product_id, production_unit_id, amount)
VALUES
  -- Electronics
  (1, 3, 10),
  -- Smart TV produced by Production Unit 3 with 10 units
  (2, 2, 20),
  -- Bluetooth Speaker produced by Production Unit 2 with 20 units
  (2, 1, 43),
  -- Bluetooth Speaker produced by Production Unit 1 with 43 units
  (3, 3, 15),
  -- Laptop produced by Production Unit 3 with 15 units
  -- Clothing
  (4, 1, 30),
  -- T-Shirt produced by Production Unit 4 with 30 units
  (5, 5, 25),
  -- Jeans produced by Production Unit 5 with 25 units
  (6, 7, 20),
  -- Dress produced by Production Unit 6 with 20 units
  -- Home & Kitchen
  (7, 5, 35),
  -- Coffee Maker produced by Production Unit 7 with 35 units
  (8, 8, 40),
  -- Blender produced by Production Unit 8 with 40 units
  (9, 1, 20),
  -- Cookware Set produced by Production Unit 1 with 20 units
  -- Computers
  (10, 2, 15),
  -- Gaming PC produced by Production Unit 2 with 15 units
  (11, 3, 25),
  -- Monitor produced by Production Unit 3 with 25 units
  (12, 4, 30),
  -- Keyboard produced by Production Unit 4 with 30 units
  -- Mobile Phones
  (13, 5, 20),
  -- Smartphone produced by Production Unit 5 with 20 units
  (14, 6, 35),
  -- Wireless Earbuds produced by Production Unit 6 with 35 units
  (15, 7, 40),
  -- Power Bank produced by Production Unit 7 with 40 units
  -- Tops
  (16, 8, 30),
  -- Tank Top produced by Production Unit 8 with 30 units
  (17, 1, 25),
  -- Turtleneck Sweater produced by Production Unit 1 with 25 units
  (18, 2, 20),
  -- Button-up Shirt produced by Production Unit 2 with 20 units
  -- Bottoms
  (19, 3, 15),
  -- Shorts produced by Production Unit 3 with 15 units
  (20, 4, 10),
  -- Leggings produced by Production Unit 4 with 10 units
  (21, 5, 20),
  -- Jeans produced by Production Unit 5 with 20 units
  -- Appliances
  (22, 6, 25),
  -- Refrigerator produced by Production Unit 6 with 25 units
  (23, 7, 30),
  -- Washing Machine produced by Production Unit 7 with 30 units
  (24, 8, 20),
  -- Air Conditioner produced by Production Unit 8 with 20 units
  -- Furniture
  (25, 1, 15),
  -- Sofa produced by Production Unit 1 with 15 units
  (26, 2, 20),
  -- Dining Table produced by Production Unit 2 with 20 units
  (27, 3, 10);

-- Bed produced by Production Unit 3 with 10 units
-- Insert data into Category table
INSERT INTO
  Category (name, parent_category)
VALUES
  ('Electronics', NULL),
  ('Clothing', NULL),
  ('Home & Kitchen', NULL),
  ('Computers', 1),
  ('Mobile Phones', 1),
  ('Tops', 2),
  ('Bottoms', 2),
  ('Appliances', 3),
  ('Furniture', 3);

-- Insert data into ProductCategory table
INSERT INTO
  ProductCategory (product_id, category_id)
VALUES
  -- Electronics
  (1, 1),
  -- Smart TV belongs to Electronics
  (2, 1),
  -- Bluetooth Speaker belongs to Electronics
  (3, 1),
  -- Laptop belongs to Electronics and Computers
  (3, 4),
  -- Laptop belongs to Electronics and Computers
  -- Clothing
  (4, 2),
  -- T-Shirt belongs to Clothing and Tops
  (4, 6),
  -- T-Shirt belongs to Clothing and Tops
  (5, 2),
  -- Jeans belongs to Clothing and Bottoms
  (5, 7),
  -- Jeans belongs to Clothing and Bottoms
  (6, 2),
  -- Dress belongs to Clothing
  -- Home & Kitchen
  (7, 3),
  -- Coffee Maker belongs to Home & Kitchen and Appliances
  (7, 8),
  -- Coffee Maker belongs to Home & Kitchen and Appliances
  (8, 3),
  -- Blender belongs to Home & Kitchen and Appliances
  (8, 8),
  -- Blender belongs to Home & Kitchen and Appliances
  (9, 3),
  -- Cookware Set belongs to Home & Kitchen and Appliances
  (9, 8),
  -- Computers
  (10, 1),
  -- Gaming PC belongs to Electronics and Computers
  (11, 1),
  -- Monitor belongs to Electronics and Computers
  (12, 1),
  -- Keyboard belongs to Electronics and Computers
  (10, 4),
  -- Gaming PC belongs to Electronics and Computers
  (11, 4),
  -- Monitor belongs to Electronics and Computers
  (12, 4),
  -- Keyboard belongs to Electronics and Computers
  -- Mobile Phones
  (13, 1),
  -- Smartphone belongs to Electronics and Mobile Phones
  (14, 1),
  -- Wireless Earbuds belongs to Electronics and Mobile Phones
  (15, 1),
  -- Power Bank belongs to Electronics and Mobile Phone
  (13, 5),
  -- Smartphone belongs to Electronics and Mobile Phones
  (14, 5),
  -- Wireless Earbuds belongs to Electronics and Mobile Phones
  (15, 5),
  -- Power Bank belongs to Electronics and Mobile Phones
  -- Tops
  (16, 2),
  -- Tank Top belongs to Clothing and Tops
  (17, 2),
  -- Turtleneck Sweater belongs to Clothing and Tops
  (18, 2),
  -- Button-up Shirt belongs to Clothing and Tops
  (16, 6),
  -- Tank Top belongs to Clothing and Tops
  (17, 6),
  -- Turtleneck Sweater belongs to Clothing and Tops
  (18, 6),
  -- Button-up Shirt belongs to Clothing and Tops
  -- Bottoms
  (19, 2),
  -- Shorts belongs to Clothing and Bottoms
  (20, 2),
  -- Leggings belongs to Clothing and Bottoms
  (21, 2),
  -- Jeans belongs to Clothing and Bottoms
  (19, 7),
  -- Shorts belongs to Clothing and Bottoms
  (20, 7),
  -- Leggings belongs to Clothing and Bottoms
  (21, 7),
  -- Jeans belongs to Clothing and Bottoms
  -- Appliances
  (22, 3),
  -- Refrigerator belongs to Home & Kitchen and Appliances
  (23, 3),
  -- Washing Machine belongs to Home & Kitchen and Appliances
  (24, 3),
  -- Air Conditioner belongs to Home & Kitchen and Appliances
  (22, 8),
  -- Refrigerator belongs to Home & Kitchen and Appliances
  (23, 8),
  -- Washing Machine belongs to Home & Kitchen and Appliances
  (24, 8),
  -- Air Conditioner belongs to Home & Kitchen and Appliances
  -- Furniture
  (25, 3),
  -- Sofa belongs to Home & Kitchen and Furniture
  (26, 3),
  -- Dining Table belongs to Home & Kitchen and Furniture
  (27, 3),
  -- Bed belongs to Home & Kitchen and Furniture
  (25, 9),
  -- Sofa belongs to Home & Kitchen and Furniture
  (26, 9),
  -- Dining Table belongs to Home & Kitchen and Furniture
  (27, 9);

-- Bed belongs to Home & Kitchen and Furniture
-- Insert data into CategoryAttribute table
INSERT INTO
  CategoryAttribute (category_id, title)
VALUES
  -- Electronics
  (1, 'Color'),
  (1, 'Screen Size'),
  (1, 'Connectivity Type'),
  (1, 'Power Source'),
  (1, 'Warranty Duration'),
  -- Clothing
  (2, 'Size'),
  (2, 'Material'),
  (2, 'Color'),
  (2, 'Style'),
  (2, 'Care Instructions'),
  -- Home & Kitchen
  (3, 'Material'),
  (3, 'Capacity'),
  (3, 'Power Consumption'),
  (3, 'Dimensions'),
  (3, 'Features'),
  -- Computers
  (4, 'Processor Type'),
  (4, 'RAM Size'),
  (4, 'Storage Capacity'),
  (4, 'Graphics Card'),
  (4, 'Operating System'),
  -- Mobile Phones
  (5, 'Battery Capacity'),
  (5, 'Camera Resolution'),
  (5, 'Storage Capacity'),
  (5, 'Operating System'),
  -- Tops
  (6, 'Sleeve Length'),
  (6, 'Neckline Style'),
  (6, 'Fabric Type'),
  -- Bottoms
  (7, 'Fit Type'),
  (7, 'Closure Type'),
  (7, 'Fabric Type'),
  -- Appliances
  (8, 'Capacity'),
  (8, 'Energy Efficiency Rating'),
  (8, 'Control Type'),
  (8, 'Installation Type'),
  -- Furniture
  (9, 'Material'),
  (9, 'Style'),
  (9, 'Assembly Required'),
  (9, 'Weight Capacity');

-- Insert data into ProductAttribute table
-- Electronics Category Attributes
INSERT INTO
  ProductAttribute (product_id, attribute_id, content)
VALUES
  (1, 1, '55"'),
  (1, 2, '4K Ultra HD'),
  (1, 3, 'Smart TV'),
  (2, 1, '15.6"'),
  (2, 2, 'Intel Core i7'),
  (2, 3, '8GB RAM, 512GB SSD'),
  (3, 1, '6.7"'),
  (3, 2, 'Quad HD+'),
  (3, 3, '128GB Storage');

-- Clothing Category Attributes
INSERT INTO
  ProductAttribute (product_id, attribute_id, content)
VALUES
  (4, 4, 'M'),
  (4, 5, 'Cotton'),
  (5, 4, 'L'),
  (5, 5, 'Denim'),
  (6, 4, 'XL'),
  (6, 5, 'Polyester');

-- Home & Kitchen Category Attributes
INSERT INTO
  ProductAttribute (product_id, attribute_id, content)
VALUES
  (7, 6, 'White'),
  (7, 7, 'Fabric'),
  (8, 6, 'Black'),
  (8, 7, 'Stainless Steel'),
  (9, 6, 'Brown'),
  (9, 7, 'Wood'),
  (10, 8, 'Wireless'),
  (10, 9, 'Over-Ear');

-- Computers Category Attributes
INSERT INTO
  ProductAttribute (product_id, attribute_id, content)
VALUES
  (2, 10, 'Windows 10'),
  (2, 11, '15.6" Full HD Display'),
  (11, 10, 'Windows 10'),
  (11, 11, 'Front Load');

-- Mobile Phones Category Attributes
INSERT INTO
  ProductAttribute (product_id, attribute_id, content)
VALUES
  (3, 12, 'Android 10'),
  (3, 13, 'Snapdragon 888'),
  (3, 14, 'Triple Camera');

-- Tops Category Attributes
INSERT INTO
  ProductAttribute (product_id, attribute_id, content)
VALUES
  (12, 15, 'Sleeveless'),
  (13, 15, 'Round Neck');

-- Bottoms Category Attributes
INSERT INTO
  ProductAttribute (product_id, attribute_id, content)
VALUES
  (13, 16, 'Size 9');

-- Appliances Category Attributes
INSERT INTO
  ProductAttribute (product_id, attribute_id, content)
VALUES
  (6, 17, '1100W'),
  (7, 17, '800W'),
  (8, 17, '12-Cup Capacity'),
  (9, 18, 'Seating for 4'),
  (11, 17, 'Front Load'),
  (14, 17, '700W'),
  (15, 18, 'Queen Size'),
  (16, 17, '2-Slice');

-- Furniture Category Attributes
INSERT INTO
  ProductAttribute (product_id, attribute_id, content)
VALUES
  (9, 19, 'Wooden'),
  (20, 19, 'Black');

-- Insert data into Rating table
INSERT INTO
  Rating (consumer_id, producer_id, product_id, rating)
VALUES
  -- Ratings for Products
  (1, NULL, 1, 4),
  (3, NULL, 2, 5),
  (5, NULL, 3, 3),
  (7, NULL, 4, 5),
  (1, NULL, 5, 4),
  -- Ratings for Producers
  (1, 6, NULL, 4),
  (3, 4, NULL, 5),
  (5, 2, NULL, 3),
  (7, 6, NULL, 5),
  (1, 4, NULL, 4);

-- Insert data into Wishlist table
INSERT INTO
  Wishlist (consumer_id, product_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (3, 4),
  (4, 5);

-- Insert data into Cart table
INSERT INTO
  Cart (
    id,
    consumer_id,
    order_date,
    delivery_date,
    status
  )
VALUES
  (1, 1, NULL, NULL, 'OPEN'),
  (2, 3, NULL, NULL, 'OPEN'),
  (3, 5, NULL, NULL, 'OPEN'),
  (4, 7, NULL, NULL, 'OPEN'),
  (
    5,
    1,
    '2023-06-20 10:30:00',
    NULL,
    'PROCESSING'
  ),
  (6, 3, '2023-05-21 14:45:00', NULL, 'PROCESSING'),
  (
    7,
    5,
    '2023-05-22 09:15:00',
    '2023-05-23 14:00:00',
    'COMPLETE'
  ),
  (
    8,
    7,
    '2023-05-22 16:20:00',
    '2023-05-23 15:00:00',
    'COMPLETE'
  ),
  (
    9,
    7,
    '2023-05-22 18:45:00',
    '2023-05-23 10:30:00',
    'COMPLETE'
  ),
  (
    10,
    7,
    '2023-05-22 18:50:00',
    '2023-05-23 11:45:00',
    'COMPLETE'
  );

-- Insert data into CartLine table
-- For open carts with cart lines
INSERT INTO
  CartLine (
    cart_id,
    product_id,
    status,
    production_unit_id,
    vehicle_id,
    amount,
    delivery_date
  )
VALUES
  (1, 1, 'OPEN', 3, NULL, 2, NULL),
  (1, 2, 'OPEN', 2, NULL, 1, NULL),
  (3, 1, 'OPEN', 3, NULL, 3, NULL),
  (5, 3, 'AWAITING_TRANSPORT', 3, NULL, 2, NULL),
  (7, 2, 'OPEN', 1, NULL, 1, NULL);

-- For carts with 'PROCESSING' status and cart lines
INSERT INTO
  CartLine (
    cart_id,
    product_id,
    status,
    production_unit_id,
    vehicle_id,
    amount
  )
VALUES
  (2, 1, 'PROCESSING', 3, NULL, 1),
  (2, 2, 'PROCESSING', 1, NULL, 2),
  (2, 3, 'AWAITING_TRANSPORT', 3, NULL, 2),
  (2, 4, 'TRANSPORT_IMMINENT', 1, 1, 1),
  (4, 5, 'PROCESSING', 5, NULL, 2),
  (4, 6, 'IN_TRANSIT', 6, 7, 3),
  (6, 7, 'LAST_KM', 5, 4, 1),
  (6, 8, 'PROCESSING', 8, NULL, 2);

-- For carts with 'COMPLETE' status and cart lines
INSERT INTO
  CartLine (
    cart_id,
    product_id,
    status,
    production_unit_id,
    vehicle_id,
    amount,
    delivery_date
  )
VALUES
  (8, 1, 'COMPLETE', 3, 3, 2, '2023-05-23 15:00:00'),
  (8, 2, 'COMPLETE', 3, 3, 1, '2023-05-23 15:00:00'),
  (8, 3, 'FAILURE', 2, 2, 2, NULL),
  (9, 2, 'COMPLETE', 2, 2, 1, '2023-05-23 16:00:00'),
  (9, 3, 'COMPLETE', 2, 2, 2, '2023-05-23 16:30:00');

INSERT INTO
  Notification (user_id, description, seen)
VALUES
  -- Producer notifications
  (
    2,
    'New product available for production.',
    FALSE
  ),
  (2, 'Production request approved.', FALSE),
  (4, 'Production order delayed.', FALSE),
  (4, 'Production order canceled.', FALSE),
  (
    6,
    'You have a new order to deliver.',
    FALSE
  ),
  -- Consumer notifications
  (1, 'Order confirmed and processing.', FALSE),
  (1, 'Order out for delivery.', FALSE),
  (3, 'Payment received for order.', FALSE),
  (3, 'Order shipped.', FALSE),
  (5, 'Delivery rescheduled.', FALSE),
  (5, 'Order delivered successfully.', FALSE),
  (7, 'Order canceled.', FALSE),
  -- Admin notifications
  (8, 'New user registration.', FALSE),
  (8, 'System update scheduled.', FALSE);