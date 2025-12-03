# 💻 VS Code Quick Start Guide

## Opening This Project in VS Code

### Step 1: Open the Folder
1. Open Visual Studio Code
2. Click `File` → `Open Folder...`
3. Navigate to and select the `ecoplate-phase4-backend` folder
4. Click `Open`

You should now see all the files in the sidebar!

---

## Step 2: Open Terminal in VS Code

### Mac/Linux:
Press: `Ctrl` + `` ` `` (backtick)

### Windows:
Press: `Ctrl` + `` ` `` (backtick)

Or: `View` → `Terminal` from the menu

---

## Step 3: Install Dependencies

In the VS Code terminal, type:
```bash
npm install
```

Wait for it to finish (you'll see a progress bar). This installs all required packages.

---

## Step 4: Configure Database

1. In VS Code sidebar, click on `.env` file
2. Find this line:
   ```
   DB_PASSWORD=your_password_here
   ```
3. Replace `your_password_here` with your actual MySQL password
4. Save the file (`Ctrl+S` or `Cmd+S`)

---

## Step 5: Start the Server

In the terminal, type:
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

✅ **Success!** Your backend is running!

---

## Step 6: Test It

### Option A: In your browser
Open: http://localhost:3000/api/products

### Option B: In VS Code (using REST Client extension)
1. Install REST Client extension
2. Create a file called `test.http`
3. Add:
   ```
   GET http://localhost:3000/api/products
   ```
4. Click "Send Request"

---

## 📁 Files You'll Work With

### Main Files (in root folder):
- `server.js` - Main server (don't need to edit)
- `.env` - Database config (UPDATE PASSWORD!)
- `package.json` - Dependencies (don't need to edit)

### API Routes (in routes/ folder):
- `products.js` - Product endpoints
- `donations.js` - Donation endpoints
- `donors.js` - Donor endpoints
- `recipients.js` - Recipient endpoints

### Frontend Examples (in frontend-examples/ folder):
- `index-updated.js` - Copy this to your project
- `donation-form-example.html` - Reference for forms

### Documentation (in documentation/ folder):
- `QUICK_START.md` - ⭐ Read this!
- All other guides

---

## 🎨 VS Code Tips

### File Explorer
- `Ctrl+B` (Windows/Linux) or `Cmd+B` (Mac) - Toggle sidebar

### Search
- `Ctrl+F` (Windows/Linux) or `Cmd+F` (Mac) - Search in file
- `Ctrl+Shift+F` - Search in all files

### Multiple Cursors
- `Alt+Click` - Add cursor
- `Ctrl+Alt+Down` - Add cursor below

### Quick Open File
- `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac) - Quick open

---

## 🔧 Recommended VS Code Extensions

### Essential:
1. **ESLint** - Code quality checker
2. **Prettier** - Code formatter
3. **REST Client** - Test APIs in VS Code

### Nice to Have:
4. **MySQL** - Database management in VS Code
5. **Thunder Client** - API testing (alternative to Postman)
6. **Code Spell Checker** - Spell checking

### How to Install Extensions:
1. Click Extensions icon in sidebar (or `Ctrl+Shift+X`)
2. Search for extension name
3. Click Install

---

## 🐛 Common VS Code Issues

### Terminal Not Working?
- Try: `Terminal` → `New Terminal`
- Or restart VS Code

### Can't See Files?
- Make sure you opened the folder, not just a file
- `File` → `Open Folder`

### npm Command Not Found?
- Node.js not installed
- Download from: https://nodejs.org/
- Restart VS Code after installing

### Server Won't Stop?
- Press `Ctrl+C` in terminal to stop server
- Or close the terminal

---

## 📝 Typical Workflow in VS Code

1. **Open project** → `File` → `Open Folder`
2. **Open terminal** → `Ctrl+`` ` ``
3. **Start server** → `npm start`
4. **Edit files** → Click files in sidebar
5. **Save changes** → `Ctrl+S` or `Cmd+S`
6. **Test API** → Browser or REST Client
7. **Stop server** → `Ctrl+C` in terminal

---

## 🚀 Next Steps

1. ✅ Opened folder in VS Code
2. ✅ Installed dependencies (`npm install`)
3. ✅ Updated `.env` with password
4. ✅ Started server (`npm start`)
5. ✅ Tested in browser

**Now read:** `documentation/QUICK_START.md` for the full guide!

---

## 💡 Pro Tips

### Auto-Save
`File` → `Auto Save` - Automatically saves files

### Format on Save
1. Install Prettier extension
2. `File` → `Preferences` → `Settings`
3. Search: "format on save"
4. Check the box

### Split Editor
- `Ctrl+\` - Split editor
- Great for viewing multiple files at once

### Integrated Git
- Source Control icon in sidebar
- Commit and push from VS Code

---

## 📞 Still Stuck?

1. Check `documentation/QUICK_START.md`
2. Check `documentation/README.md`
3. Look at error messages in terminal
4. Make sure MySQL is running

---

**You're all set! Happy coding in VS Code! 🎉**
