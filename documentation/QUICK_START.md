# 🚀 EcoPlate Quick Start Guide

## Get Running in 5 Minutes!

### Step 1: Install Node.js (if not already installed)
Download from: https://nodejs.org/
Verify: `node --version` and `npm --version`

### Step 2: Install Dependencies
Open terminal in the project folder and run:
```bash
npm install
```

### Step 3: Configure Database
1. Open the `.env` file
2. Update with your MySQL credentials:
   ```
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=ecoplate_db
   ```

3. In MySQL, create the database and run your SQL files:
   ```sql
   CREATE DATABASE ecoplate_db;
   USE ecoplate_db;
   SOURCE /path/to/create.sql;
   SOURCE /path/to/load.sql;
   ```

### Step 4: Start the Server
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

### Step 5: Test It!
Open your browser and go to:
- http://localhost:3000 (server info)
- http://localhost:3000/api/products (see all products)

### Step 6: Connect Your Frontend
Replace your old `index.js` with the new one provided. The new file:
- Fetches products from the database (not hardcoded)
- Displays real data with expiration dates
- Shows donor information
- Has working "Request Donation" buttons

---

## Quick Test Commands

### View all products:
```bash
curl http://localhost:3000/api/products
```

### View all donors:
```bash
curl http://localhost:3000/api/donors
```

### Create a test donation:
```bash
curl -X POST http://localhost:3000/api/donations \
  -H "Content-Type: application/json" \
  -d '{"donor_id":1,"status":"available"}'
```

---

## File Structure

```
Your Project/
├── backend/                    ← Put all backend files here
│   ├── config/
│   │   └── database.js        ← Database connection
│   ├── routes/
│   │   ├── products.js        ← Product endpoints
│   │   ├── donations.js       ← Donation endpoints
│   │   ├── donors.js          ← Donor endpoints
│   │   └── recipients.js      ← Recipient endpoints
│   ├── .env                   ← Database credentials (UPDATE THIS!)
│   ├── package.json           ← Dependencies
│   ├── server.js              ← Main server file
│   ├── README.md              ← Full documentation
│   └── API_DOCUMENTATION.md   ← API reference
│
└── frontend/                   ← Your HTML/CSS files
    ├── index.html
    ├── browse.html
    ├── donation.html
    ├── styles.css
    └── index.js               ← REPLACE with new version!
```

---

## Common Issues & Solutions

### ❌ "Cannot connect to database"
**Solution:** Check your `.env` file has correct credentials

### ❌ "Port 3000 already in use"
**Solution:** Change PORT in `.env` to 3001 or kill the process:
```bash
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

### ❌ "CORS error" in browser
**Solution:** Make sure server is running AND you're accessing via `http://` not `file://`

### ❌ "Module not found"
**Solution:** Run `npm install` again

---

## What This Gives You

✅ **Full CRUD Operations**
   - Create donations
   - Read/display products
   - Update donation status
   - Delete products/donations

✅ **Input Validation**
   - Email format checking
   - Required field validation
   - Quantity validation
   - Unique email enforcement

✅ **Database Connectivity**
   - Connects HTML forms to MySQL
   - Real-time data fetching
   - Transaction support

✅ **Professional API**
   - RESTful endpoints
   - JSON responses
   - Error handling
   - CORS enabled

---

## Next Steps After Testing

1. ✅ Test all endpoints with Postman
2. ✅ Update your HTML forms to submit to backend
3. ✅ Add error messages to your forms
4. ✅ Test the complete flow: Browse → Request → Donate
5. ✅ Document your testing in Phase 4 report

---

## Need Help?

1. Check console logs for error messages
2. Read the full README.md for detailed instructions
3. Check API_DOCUMENTATION.md for endpoint examples
4. Test individual endpoints with curl or Postman

---

## Phase 4 Checklist

Before submitting, verify:
- [x] Backend server starts without errors
- [x] Can connect to MySQL database
- [x] All API endpoints return data
- [x] Frontend can fetch and display products
- [x] Forms can submit to backend
- [x] Input validation works
- [x] Error messages display properly

---

**You're ready to go! Good luck with Phase 4! 🎉**
