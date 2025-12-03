# 🍃 EcoPlate Phase 4 - Backend Implementation

**Complete Node.js + Express + MySQL Backend for Food Donation Platform**

---

## 📂 Folder Structure

```
ecoplate-phase4-backend/
│
├── 📄 README.md (this file)          ← START HERE!
├── 📄 .env                            ← UPDATE with your MySQL password!
├── 📄 package.json                    ← Dependencies config
├── 📄 server.js                       ← Main server file
│
├── 📁 config/
│   └── database.js                    ← Database connection
│
├── 📁 routes/
│   ├── products.js                    ← Product API endpoints
│   ├── donations.js                   ← Donation API endpoints
│   ├── donors.js                      ← Donor API endpoints
│   └── recipients.js                  ← Recipient API endpoints
│
├── 📁 documentation/
│   ├── QUICK_START.md                 ← ⭐ Read this first!
│   ├── README.md                      ← Full setup guide
│   ├── API_DOCUMENTATION.md           ← All endpoints documented
│   ├── PROJECT_SUMMARY.md             ← Project overview
│   ├── IMPLEMENTATION_CHECKLIST.md    ← Step-by-step checklist
│   └── FILE_GUIDE.md                  ← What each file does
│
└── 📁 frontend-examples/
    ├── donation-form-example.html     ← Working form example
    └── index-updated.js               ← Updated JavaScript for browse page
```

---

## 🚀 Quick Start (5 Minutes)

### 1. Install Node.js
Download from: https://nodejs.org/

Verify installation:
```bash
node --version
npm --version
```

### 2. Install Dependencies
Open terminal in this folder and run:
```bash
npm install
```

### 3. Configure Database
1. Open `.env` file
2. Change this line:
   ```
   DB_PASSWORD=your_password_here
   ```
   To your actual MySQL password

### 4. Setup Database
In MySQL:
```sql
CREATE DATABASE ecoplate_db;
USE ecoplate_db;
-- Run your existing create.sql file
-- Run your existing load.sql file
```

### 5. Start Server
```bash
npm start
```

You should see:
```
===========================================
EcoPlate Server running on port 3000
Successfully connected to MySQL database
===========================================
```

### 6. Test It!
Open browser: http://localhost:3000/api/products

---

## 📚 Where to Find Information

### First Time Setup?
→ Read: `documentation/QUICK_START.md`

### Need Detailed Instructions?
→ Read: `documentation/README.md`

### Want to Know What APIs Exist?
→ Read: `documentation/API_DOCUMENTATION.md`

### Need Step-by-Step Checklist?
→ Read: `documentation/IMPLEMENTATION_CHECKLIST.md`

### Don't Understand a File?
→ Read: `documentation/FILE_GUIDE.md`

### Want Project Overview?
→ Read: `documentation/PROJECT_SUMMARY.md`

---

## 🎨 Connecting Your Frontend

### For your browse.html page:
1. Copy `frontend-examples/index-updated.js`
2. Replace your old `index.js` with this new version
3. Make sure browse.html includes: `<script src="index.js"></script>`

### For your donation.html page:
1. Look at `frontend-examples/donation-form-example.html`
2. Copy the JavaScript code
3. Adapt it to your existing form

---

## 🔌 API Endpoints Available

### Products
- `GET /api/products` - All products
- `GET /api/products/available` - Available products with donors
- `GET /api/products/:id` - Single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Donations
- `GET /api/donations` - All donations
- `GET /api/donations/:id` - Single donation
- `POST /api/donations` - Create donation
- `PUT /api/donations/:id` - Update donation
- `DELETE /api/donations/:id` - Delete donation
- `GET /api/donations/donor/:donorId` - By donor
- `GET /api/donations/recipient/:recipientId` - By recipient

### Donors
- `GET /api/donors` - All donors
- `GET /api/donors/:id` - Single donor
- `POST /api/donors` - Create donor
- `PUT /api/donors/:id` - Update donor
- `DELETE /api/donors/:id` - Delete donor

### Recipients
- `GET /api/recipients` - All recipients
- `GET /api/recipients/:id` - Single recipient
- `POST /api/recipients` - Create recipient
- `PUT /api/recipients/:id` - Update recipient
- `DELETE /api/recipients/:id` - Delete recipient
- `POST /api/recipients/:id/request` - Request product
- `GET /api/recipients/:id/requests` - View requests

---

## ✅ Phase 4 Requirements

✅ Database connectivity from HTML forms to MySQL  
✅ Full CRUD operations (Create, Read, Update, Delete)  
✅ User input validation with error flagging  
✅ Display query results in forms and reports  
✅ Functional donor interface  
✅ Functional recipient interface  

---

## 🐛 Troubleshooting

### Server won't start?
- Make sure Node.js is installed
- Run `npm install` first
- Check `.env` has correct database password

### Can't connect to database?
- Make sure MySQL is running
- Verify `.env` credentials
- Check database `ecoplate_db` exists

### Frontend not loading data?
- Make sure backend server is running
- Check browser console (F12) for errors
- Verify API URL in JavaScript: `http://localhost:3000/api`

### Port 3000 already in use?
- Change PORT in `.env` to 3001
- Or stop other process using port 3000

---

## 📝 Testing Your Backend

### Quick Browser Test
1. http://localhost:3000 → Server info
2. http://localhost:3000/api/products → All products
3. http://localhost:3000/api/donors → All donors

### Using Postman (Recommended)
1. Download: https://www.postman.com/downloads/
2. Test GET requests to all endpoints
3. Test POST/PUT/DELETE with request bodies

### Using curl
```bash
# Get all products
curl http://localhost:3000/api/products

# Create a donor
curl -X POST http://localhost:3000/api/donors \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Donor","phone_num":"123-456-7890","email":"test@test.com"}'
```

---

## 🎓 What You're Submitting

This backend demonstrates:
- Professional Node.js/Express architecture
- RESTful API design
- MySQL database connectivity
- Complete CRUD operations
- Input validation
- Error handling
- Frontend-backend integration
- Production-ready code

---

## 💻 How to Use in VS Code

1. Open VS Code
2. File → Open Folder
3. Select this `ecoplate-phase4-backend` folder
4. Open terminal in VS Code (Ctrl+` or Cmd+`)
5. Run: `npm install`
6. Run: `npm start`
7. Start coding!

**VS Code Extensions Recommended:**
- REST Client (test APIs directly in VS Code)
- ESLint (code quality)
- Prettier (code formatting)

---

## 📞 Need Help?

1. Check the `documentation/` folder
2. Read `QUICK_START.md` for common issues
3. Check server terminal for error messages
4. Check browser console (F12) for frontend errors

---

## 🎉 You're Ready!

Everything you need is in this folder. Just follow the Quick Start guide and you'll be running in minutes!

**Good luck with Phase 4!** 🚀

---

**Created for:** CS 4347 Database Systems - Phase 4  
**Technology:** Node.js + Express + MySQL  
**Status:** Complete and Ready to Use ✅
