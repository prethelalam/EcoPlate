# Phase 4 Implementation Checklist

## 📥 Step 1: Download and Organize Files

### Backend Files (Put in a folder called "backend")
- [ ] package.json
- [ ] server.js
- [ ] .env (UPDATE with your MySQL password!)
- [ ] config/ folder (with database.js)
- [ ] routes/ folder (with all 4 route files)

### Frontend Files (Update your existing files)
- [ ] index.js (REPLACE your old one)
- [ ] donation-form-example.html (Use as reference)

### Documentation (Keep for reference)
- [ ] README.md
- [ ] API_DOCUMENTATION.md
- [ ] QUICK_START.md
- [ ] PROJECT_SUMMARY.md

---

## 🔧 Step 2: Backend Setup (30 minutes)

### Install Node.js
- [ ] Download from https://nodejs.org/
- [ ] Verify: Run `node --version` in terminal
- [ ] Verify: Run `npm --version` in terminal

### Install Dependencies
- [ ] Open terminal in backend folder
- [ ] Run: `npm install`
- [ ] Wait for all packages to install (may take 2-3 minutes)

### Configure Database
- [ ] Open .env file
- [ ] Change DB_PASSWORD to your MySQL password
- [ ] Keep DB_NAME as "ecoplate_db"
- [ ] Save the file

### Create Database
- [ ] Open MySQL Workbench (or command line)
- [ ] Run: `CREATE DATABASE ecoplate_db;`
- [ ] Run: `USE ecoplate_db;`
- [ ] Run your create.sql file
- [ ] Run your load.sql file
- [ ] Verify data: `SELECT * FROM Product;`

### Start Backend Server
- [ ] In backend folder terminal, run: `npm start`
- [ ] Should see: "Successfully connected to MySQL database"
- [ ] Should see: "EcoPlate Server running on port 3000"
- [ ] Keep this terminal window open!

---

## 🧪 Step 3: Test Backend API (15 minutes)

### Test in Browser
- [ ] Open: http://localhost:3000
  - Should see: Welcome message with endpoints
- [ ] Open: http://localhost:3000/api/products
  - Should see: JSON list of products from your database
- [ ] Open: http://localhost:3000/api/donors
  - Should see: JSON list of donors

### Test with Postman (Optional but Recommended)
- [ ] Download Postman: https://www.postman.com/downloads/
- [ ] Test GET http://localhost:3000/api/products
- [ ] Test GET http://localhost:3000/api/donors
- [ ] Test POST http://localhost:3000/api/donors
  ```json
  {
    "name": "Test Donor",
    "phone_num": "123-456-7890",
    "email": "test@test.com"
  }
  ```

---

## 🎨 Step 4: Connect Frontend (20 minutes)

### Update browse.html
- [ ] Replace old index.js with new one
- [ ] Make sure browse.html includes: `<script src="index.js"></script>`
- [ ] Open browse.html in browser (just double-click)
- [ ] Should see: Products loading from database
- [ ] Check browser console (F12) for any errors

### Update donation.html
Option A: Use the example form
- [ ] Copy donation-form-example.html content
- [ ] Paste into your donation.html
- [ ] Test the form

Option B: Add JavaScript to existing form
- [ ] Open donation-form-example.html
- [ ] Copy the `<script>` section
- [ ] Add to your donation.html
- [ ] Update form IDs to match

### Test the Form
- [ ] Select a donor from dropdown
- [ ] Select a product
- [ ] Enter quantity
- [ ] Click Submit
- [ ] Should see: "Donation submitted successfully!"
- [ ] Verify in MySQL: `SELECT * FROM Donation;`

---

## ✅ Step 5: Verify All CRUD Operations

### CREATE (Post) ✓
- [ ] Create new donor via form
- [ ] Create new donation via form
- [ ] Verify in database

### READ (Get) ✓
- [ ] Browse products page shows data
- [ ] API returns all records
- [ ] Individual items can be viewed

### UPDATE (Put) ✓
- [ ] Test with Postman:
  ```
  PUT http://localhost:3000/api/donations/1
  Body: {"status": "completed"}
  ```
- [ ] Verify change in database

### DELETE ✓
- [ ] Test with Postman:
  ```
  DELETE http://localhost:3000/api/products/1
  ```
- [ ] Verify deletion in database

---

## 🎯 Step 6: Validation Testing

### Test Required Fields
- [ ] Try submitting form without donor → Should show error
- [ ] Try submitting without product → Should show error
- [ ] Try submitting with quantity = 0 → Should show error

### Test Email Validation
- [ ] Try creating donor with invalid email → Should reject
- [ ] Try creating donor with duplicate email → Should reject

### Test Data Integrity
- [ ] Try deleting donor with donations → Should cascade
- [ ] Try invalid donation status → Should reject

---

## 📊 Step 7: Phase 4 Documentation

### What to Include in Your Report

#### Screenshots to Take:
1. [ ] Terminal showing server starting successfully
2. [ ] Browser showing API response (http://localhost:3000/api/products)
3. [ ] Browse page displaying products from database
4. [ ] Donation form with dropdowns populated
5. [ ] Success message after form submission
6. [ ] MySQL query showing inserted data

#### Code to Include:
1. [ ] Database connection code (config/database.js)
2. [ ] One complete route file (e.g., products.js)
3. [ ] Frontend API call code (from index.js)
4. [ ] Validation example

#### Documentation to Write:
1. [ ] Explain your architecture (Node.js + Express + MySQL)
2. [ ] List all API endpoints
3. [ ] Describe validation rules
4. [ ] Show example request/response
5. [ ] Discuss any challenges and solutions

---

## 🚨 Common Issues & Solutions

### Issue: "npm: command not found"
**Solution:** Node.js not installed. Download from nodejs.org

### Issue: "Cannot connect to database"
**Solution:** 
- Check MySQL is running
- Verify .env credentials
- Make sure database exists

### Issue: "Port 3000 already in use"
**Solution:**
- Change PORT in .env to 3001
- Or kill process: `lsof -ti:3000 | xargs kill -9` (Mac/Linux)

### Issue: "CORS error in browser"
**Solution:**
- Make sure backend server is running
- Access HTML via http:// not file://
- CORS is already enabled in server.js

### Issue: "Module not found"
**Solution:**
- Run `npm install` again
- Delete node_modules folder and run `npm install`

### Issue: "Products not loading"
**Solution:**
- Check browser console for errors
- Verify API_BASE_URL in index.js is correct
- Test API directly: http://localhost:3000/api/products

---

## 🎓 Grading Criteria Met

### Database Connectivity ✅
- [x] Forms connect to MySQL
- [x] Data retrieved from database
- [x] Queries execute properly

### CRUD Operations ✅
- [x] Create: POST endpoints
- [x] Read: GET endpoints
- [x] Update: PUT endpoints
- [x] Delete: DELETE endpoints

### Input Validation ✅
- [x] Required fields checked
- [x] Email format validated
- [x] Quantity validated
- [x] Error messages displayed

### Query Results ✅
- [x] Products displayed in browse page
- [x] Donations shown with details
- [x] Forms populated with data

### Functional Interfaces ✅
- [x] Donor can submit donations
- [x] Recipient can browse products
- [x] Both interfaces working

---

## 📝 Final Checklist Before Submission

- [ ] All backend files included
- [ ] Screenshots taken
- [ ] Code documented
- [ ] README describes setup
- [ ] All CRUD operations demonstrated
- [ ] Validation working
- [ ] No errors in console
- [ ] Database properly populated
- [ ] Report completed
- [ ] Code commented

---

## 🎉 You're Done!

If you've checked all boxes above, you have:
✅ A fully functional backend with Node.js and Express
✅ Complete CRUD operations for all entities
✅ Comprehensive input validation
✅ Working frontend-to-backend integration
✅ Professional documentation

**Good luck with your Phase 4 submission!** 🚀

---

**Estimated Total Time:** 1.5 - 2 hours
**Difficulty Level:** Moderate
**Help Available:** Check README.md and API_DOCUMENTATION.md
