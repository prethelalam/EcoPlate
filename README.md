# EcoPlate 🌱

A web application designed to reduce food waste by connecting donors (grocery stores, restaurants, dining halls) with recipients (food banks, charities, shelters) through real-time tracking and centralized database management.

**CS 4347.004:** Database Systems  
**Professor:** Dr. Jalal Omer  


## Team Members
- Prethel  
- Kumud  
- Reid  
- Tobenna  
- Zeel  


## Acknowledgments
This project was developed as part of the Database Systems (CS 4347) course at UT Dallas. We thank Dr. Jalal Omer for the opportunity to gain hands-on experience in database design, SQL security, and full-stack development.

## Project Overview
EcoPlate addresses food waste by providing a platform where donors can list surplus food items and recipients can browse and request available donations. The system tracks donation status, manages inventory, and maintains waste logs using a MySQL database with a Node.js/Express backend.


## Tech Stack
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Architecture:** 3-Tier Web Application  


## Key Features
- Donor registration and product listing  
- Recipient browsing and donation requests  
- Real-time inventory tracking  
- Donation status management (pending, completed, cancelled)  
- SQL injection protection using prepared statements  
- Referential integrity with CASCADE constraints  



## Installation & Setup

### Prerequisites
- Node.js (v14+)  
- MySQL Server (v8.0+)  

### Quick Start

Clone and install dependencies:
```bash
git clone <repository-url>
cd ecoplate
npm install
```
Setup database:
```
mysql -u root -p
CREATE DATABASE ecoplate_db;
USE ecoplate_db;
source SQL\ Files/create.sql
source SQL\ Files/load.sql
```

Configure environment (.env file):
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecoplate_db
PORT=3000
```
Start server:
```
node server.js
```

## SQL Injection Assignment
#### Part A: Vulnerable Login (part-a-vulnerable.html)
Demonstrates SQL injection using string concatenation. Try these attacks:

`` admin' -- `` (bypasses password)

`` ' OR 1=1 -- `` (returns all users)

### Part B: Protected Login (part-b-protected.html)

Shows proper protection using prepared statements. Test credentials:

Username: `` admin ``

Password: `` admin123 ``

### Database Structure

10 normalized tables (3NF):

- Core: Donor, Recipient, Product, Donation, Waste_log

- Relationships: Works_With, MENU_SELECTION, Donated_as, Food_id, Product_ID

## Project Structure
```
ecoplate/
├── SQL Files/          # Database scripts and data
├── routes/             # API endpoints
├── *.html              # Frontend pages
├── index.js            # Frontend logic
├── server.js           # Express server
└── .env                # Configuration (create this)
```
## Future Improvements

- User authentication system
- Email notifications for new donations
- Mobile application
- Analytics dashboard
