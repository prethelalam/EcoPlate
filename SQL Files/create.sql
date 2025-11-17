-- Donor table
CREATE TABLE Donor(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    phone_num VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Recipient table
CREATE TABLE Recipient(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    phone_num VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    capacity INT NOT NULL
);

-- Product table
CREATE TABLE Product(
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    expiration_date DATE NOT NULL,
    quantity INT NOT NULL
);

-- Donation table
CREATE TABLE Donation(
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(20) NOT NULL,
    donor_id INT NOT NULL,
    recipient_id INT NOT NULL,
    donation_date DATE NOT NULL,
    FOREIGN KEY (donor_id) REFERENCES Donor(id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES Recipient(id) ON DELETE CASCADE
);

-- Waste_log table
CREATE TABLE Waste_log(
    Log_Spreadsheet_id INT AUTO_INCREMENT PRIMARY KEY,
    date_discarded DATE NOT NULL,
    discard_reason VARCHAR(256)
);

-- Works_With table
CREATE TABLE Works_With(
    donor_id INT NOT NULL,
    recipient_id INT NOT NULL,
    PRIMARY KEY (donor_id, recipient_id),
    FOREIGN KEY (donor_id) REFERENCES Donor(id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES Recipient(id) ON DELETE CASCADE
);

-- MENU_SELECTION table
CREATE TABLE MENU_SELECTION(
    Product_id INT NOT NULL,
    recipient_id INT NOT NULL,
    quantity INT,
    PRIMARY KEY (Product_id, recipient_id),
    FOREIGN KEY (Product_id) REFERENCES Product(id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES Recipient(id) ON DELETE CASCADE
);

-- Product_ID table
CREATE TABLE Product_ID(
    FoodProduct_id INT NOT NULL,
    Log_Spreadsheet_id INT NOT NULL,
    PRIMARY KEY (FoodProduct_id, Log_Spreadsheet_id),
    FOREIGN KEY (FoodProduct_id) REFERENCES Product(id) ON DELETE CASCADE,
    FOREIGN KEY (Log_Spreadsheet_id) REFERENCES Waste_log(Log_Spreadsheet_id) ON DELETE CASCADE
);

-- Food_id table
CREATE TABLE Food_id(
    Food_id INT NOT NULL,
    Donation_id INT NOT NULL,
    PRIMARY KEY (Food_id, Donation_id),
    FOREIGN KEY (Food_id) REFERENCES Product(id) ON DELETE CASCADE,
    FOREIGN KEY (Donation_id) REFERENCES Donation(id) ON DELETE CASCADE
);

-- Donated_as table
CREATE TABLE Donated_as(
    Product_id INT NOT NULL,
    Donation_id INT NOT NULL,
    quantity INT,
    PRIMARY KEY (Product_id, Donation_id),
    FOREIGN KEY (Product_id) REFERENCES Product(id) ON DELETE CASCADE,
    FOREIGN KEY (Donation_id) REFERENCES Donation(id) ON DELETE CASCADE
);
