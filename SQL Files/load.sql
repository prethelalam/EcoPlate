INSERT INTO Donor (name, phone_num, email) VALUES
('Dining Hall West', '972-883-7466', 'dininghallwest@utdallas.edu'),
('The Market UTD', '972-883-7690', 'marketatutd@utdallas.edu'),
('Halal Shack', '972-883-7800', 'halalshack@gmail.com'),
('Tom Thumb', '972-680-6010', 'tomthumb@gmail.com'),
('Sprouts Farmers Market', '214-442-5961', 'sprouts@farmersmarket.com');

INSERT INTO Recipient (name, phone_num, email, capacity) VALUES
('North Texas Food Bank', '214-572-4047', 'info@ntfb.org', 500),
('The Bridge Homeless Recovery Center', '214-670-1507', 'info@bridgehrc.org', 200),
('Richardson Senior Citizen Center', '972-744-7800', 'AskRichardsonSeniorCenter@cor.gov', 150),
('Minnies Food Pantry', '972-596-0253', 'Info@minniesfoodpantry.org', 100),
('Local Good Pantry', '469-445-2048', 'info@localgoodpantry.org', 300);

INSERT INTO Product (category, name, expiration_date, quantity) VALUES
('Produce', 'Apples', '2025-11-25', 50),
('Produce', 'Carrots', '2025-11-22', 30),
('Bakery', 'Bread loaves', '2025-11-18', 20),
('Dairy', 'Milk gallons', '2025-11-20', 15),
('Dairy', 'Yogurt cups', '2025-11-19', 25),
('Bakery', 'Bagels', '2025-11-17', 40),
('Canned Goods', 'Pinto beans', '2026-08-12', 60),
('Protein', 'Chicken tenders', '2025-11-20', 35),
('Dairy', 'Cheese sticks', '2026-01-21', 45),
('Produce', 'Tomatoes', '2025-11-18', 50);

INSERT INTO Donation (status, donor_id, recipient_id, donation_date) VALUES
('Completed', 1, 1, '2025-11-10'),
('Pending', 2, 2, '2025-11-16'),
('Completed', 3, 3, '2025-11-12'),
('In-Progress', 4, 4, '2025-11-15'),
('Completed', 5, 5, '2025-11-08');

INSERT INTO Works_With (donor_id, recipient_id) VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(2, 1),
(3, 1);

INSERT INTO MENU_SELECTION (Product_id, recipient_id, quantity) VALUES
(1, 1, 20),
(2, 1, 15),
(3, 2, 10),
(4, 2, 8),
(5, 3, 12),
(7, 1, 30),
(8, 4, 15);

INSERT INTO Waste_log (date_discarded, discard_reason) VALUES
('2025-11-01', 'Expired before pickup'),
('2025-11-20', 'Damaged packaging'),
('2025-11-14', 'Quality concerns');

INSERT INTO Product_ID (FoodProduct_id, Log_Spreadsheet_id) VALUES
(6, 1),
(9, 2),
(10, 3);

INSERT INTO Food_id (Food_id, Donation_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 3),
(8, 4),
(7, 5);

INSERT INTO Donated_as (Product_id, Donation_id, quantity) VALUES
(1, 1, 25),
(2, 1, 15),
(3, 2, 10),
(4, 2, 8),
(5, 3, 12),
(8, 4, 20),
(7, 5, 30);
