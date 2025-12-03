# 📁 File Directory Guide

## What Each File Does

### 🔧 Core Backend Files

#### `server.js` - Main Server File
- **Purpose:** Entry point for the entire backend application
- **What it does:**
  - Starts the Express server
  - Sets up middleware (CORS, body parser)
  - Imports and connects all route files
  - Handles errors
  - Logs requests
- **Run with:** `npm start` or `node server.js`
- **Don't modify unless:** You know what you're doing

#### `package.json` - Dependencies Configuration
- **Purpose:** Lists all required Node.js packages
- **What it does:**
  - Tells npm what to install
  - Defines start scripts
  - Specifies project metadata
- **Run:** `npm install` to install everything listed here
- **Don't modify:** Already configured perfectly

#### `.env` - Environment Configuration
- **Purpose:** Stores sensitive database credentials
- **What it does:**
  - Keeps passwords out of code
  - Allows different settings per environment
  - Used by dotenv package
- **⚠️ ACTION REQUIRED:** Update DB_PASSWORD with your MySQL password
- **⚠️ IMPORTANT:** Never commit this file to Git (contains passwords!)

---

### 🗄️ Database Configuration

#### `config/database.js` - Database Connection
- **Purpose:** Manages MySQL database connection
- **What it does:**
  - Creates connection pool
  - Reads credentials from .env
  - Tests connection on startup
  - Exports connection for routes to use
- **Used by:** All route files
- **Don't modify:** Works perfectly as is

---

### 🛣️ API Route Files (All in `routes/` folder)

#### `routes/products.js` - Product Management
- **Endpoints:**
  - `GET /api/products` - List all products
  - `GET /api/products/available` - Products with donor info
  - `GET /api/products/:id` - Get single product
  - `POST /api/products` - Create new product
  - `PUT /api/products/:id` - Update product
  - `DELETE /api/products/:id` - Delete product
- **Used for:** Product catalog, browse page
- **Validation:** All fields required, quantity must be positive

#### `routes/donations.js` - Donation Management
- **Endpoints:**
  - `GET /api/donations` - List all donations
  - `GET /api/donations/:id` - Get donation with products
  - `POST /api/donations` - Create donation
  - `PUT /api/donations/:id` - Update donation
  - `DELETE /api/donations/:id` - Delete donation
  - `GET /api/donations/donor/:donorId` - Donor's donations
  - `GET /api/donations/recipient/:recipientId` - Recipient's donations
- **Used for:** Main donation workflow
- **Special:** Handles transactions (multiple tables updated together)

#### `routes/donors.js` - Donor Management
- **Endpoints:**
  - `GET /api/donors` - List all donors
  - `GET /api/donors/:id` - Get single donor
  - `POST /api/donors` - Create new donor
  - `PUT /api/donors/:id` - Update donor
  - `DELETE /api/donors/:id` - Delete donor
- **Used for:** Donor registration, donor dropdown in forms
- **Validation:** Email format, email uniqueness

#### `routes/recipients.js` - Recipient Management
- **Endpoints:**
  - `GET /api/recipients` - List all recipients
  - `GET /api/recipients/:id` - Get single recipient
  - `POST /api/recipients` - Create recipient
  - `PUT /api/recipients/:id` - Update recipient
  - `DELETE /api/recipients/:id` - Delete recipient
  - `POST /api/recipients/:id/request` - Request product
  - `GET /api/recipients/:id/requests` - View requests
- **Used for:** Recipient registration, product requests
- **Validation:** Name required, capacity must be non-negative

---

### 🎨 Frontend Files

#### `index.js` - Updated JavaScript for Browse Page
- **Purpose:** Replaces your old hardcoded index.js
- **What it does:**
  - Fetches real products from backend API
  - Displays products with proper formatting
  - Shows expiration dates and donor info
  - Handles "Load More" pagination
  - Manages request buttons
  - Error handling for network issues
- **Where to use:** In your browse.html
- **Replace:** Your existing index.js with this file

#### `donation-form-example.html` - Complete Working Form
- **Purpose:** Shows how to build a form that submits to backend
- **What it does:**
  - Dynamically loads dropdowns from API
  - Validates input client-side
  - Submits data to backend
  - Shows success/error messages
  - Includes all necessary HTML, CSS, and JavaScript
- **Use as:** Reference or copy directly to your donation.html
- **Demonstrates:** Complete form-to-backend integration

---

### 📚 Documentation Files

#### `README.md` - Complete Setup Guide
- **Purpose:** Main documentation for setting up the project
- **Sections:**
  - Installation instructions
  - Database configuration
  - How to start server
  - Frontend integration
  - Troubleshooting
  - Project structure
- **When to read:** First! This is your main guide
- **Length:** Comprehensive (~8000 words)

#### `QUICK_START.md` - 5-Minute Setup
- **Purpose:** Get running fast
- **Sections:**
  - Condensed setup steps
  - Quick test commands
  - Common issues
  - Checklist
- **When to read:** If you just want to get started quickly
- **Length:** Short and focused (~4000 words)

#### `API_DOCUMENTATION.md` - API Reference
- **Purpose:** Complete reference for all endpoints
- **Sections:**
  - Every endpoint documented
  - Request/response examples
  - Validation rules
  - curl commands
  - Error formats
- **When to read:** When you need to know exact API details
- **Use for:** Testing, understanding endpoints, debugging

#### `PROJECT_SUMMARY.md` - What Was Built
- **Purpose:** Overview of the entire implementation
- **Sections:**
  - List of all files created
  - Phase 4 requirements coverage
  - Key features
  - Setup checklist
- **When to read:** To understand the complete project
- **Use for:** Phase 4 report, understanding architecture

#### `IMPLEMENTATION_CHECKLIST.md` - Step-by-Step Guide
- **Purpose:** Detailed implementation and testing checklist
- **Sections:**
  - Setup steps with checkboxes
  - Testing procedures
  - Validation testing
  - Documentation requirements
  - Troubleshooting
- **When to read:** While implementing the project
- **Use for:** Making sure you complete everything

---

## 🗂️ Recommended File Organization

```
Your-Project-Folder/
│
├── backend/                    ← Create this folder
│   ├── config/
│   │   └── database.js        ← Put here
│   ├── routes/
│   │   ├── products.js        ← Put here
│   │   ├── donations.js       ← Put here
│   │   ├── donors.js          ← Put here
│   │   └── recipients.js      ← Put here
│   ├── node_modules/          ← Created by npm install
│   ├── .env                   ← Put here (UPDATE PASSWORD!)
│   ├── package.json           ← Put here
│   ├── package-lock.json      ← Created by npm install
│   └── server.js              ← Put here
│
├── frontend/                   ← Your existing HTML folder
│   ├── index.html             ← Your existing file
│   ├── browse.html            ← Your existing file
│   ├── donation.html          ← Your existing file
│   ├── styles.css             ← Your existing file
│   └── index.js               ← REPLACE with new version
│
├── documentation/              ← Create this folder
│   ├── README.md              ← Put here
│   ├── QUICK_START.md         ← Put here
│   ├── API_DOCUMENTATION.md   ← Put here
│   ├── PROJECT_SUMMARY.md     ← Put here
│   └── IMPLEMENTATION_CHECKLIST.md  ← Put here
│
└── examples/                   ← Create this folder
    └── donation-form-example.html  ← Put here
```

---

## 🎯 Which Files Do You NEED to Use?

### Absolutely Required:
✅ `package.json` - Without this, npm install won't work
✅ `server.js` - Without this, server won't start
✅ `.env` - Without this, can't connect to database
✅ `config/database.js` - Without this, routes can't access database
✅ All 4 route files - Without these, no API endpoints work

### Highly Recommended:
⭐ `index.js` (updated) - Makes your browse page actually work
⭐ `README.md` - Tells you how to set everything up
⭐ `QUICK_START.md` - Fast setup instructions

### Reference/Optional:
📖 `API_DOCUMENTATION.md` - Nice to have for understanding endpoints
📖 `PROJECT_SUMMARY.md` - Good for understanding the project
📖 `IMPLEMENTATION_CHECKLIST.md` - Helpful guide
📖 `donation-form-example.html` - Good example to learn from

---

## 🔍 How Files Connect

```
User Opens browse.html
    ↓
Loads index.js (your updated file)
    ↓
index.js makes fetch() call to http://localhost:3000/api/products
    ↓
Request goes to server.js
    ↓
server.js routes to routes/products.js
    ↓
routes/products.js uses config/database.js
    ↓
Database query executes in MySQL
    ↓
Results return through the chain
    ↓
index.js receives JSON data
    ↓
Data displayed on browse.html page
```

---

## ⚡ Quick Reference

### To Start Backend:
1. cd into backend folder
2. Run `npm install` (first time only)
3. Run `npm start`

### To Test API:
- Open http://localhost:3000/api/products in browser

### To Update Frontend:
1. Replace old index.js with new one
2. Open browse.html in browser
3. Should see real data from database

### To Submit Form:
1. Use donation-form-example.html as reference
2. Make sure backend is running
3. Test form submission

---

## 📞 If You Get Stuck

1. **Check README.md** - Main troubleshooting guide
2. **Check console logs** - Terminal shows errors
3. **Check browser console** (F12) - Shows frontend errors
4. **Check QUICK_START.md** - Common issues listed there

---

**Remember:** You don't need to understand every line of code. The system works as a complete package. Just follow the setup instructions and test each part!
