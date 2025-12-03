# EcoPlate Backend - Setup Guide

## 📋 Project Overview
EcoPlate is a food waste reduction platform connecting food donors (restaurants, grocery stores) with recipients (food banks, shelters). This backend provides RESTful API endpoints for managing products, donations, donors, and recipients.

## 🛠️ Technology Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **Key Libraries:**
  - mysql2 (database connection)
  - cors (cross-origin resource sharing)
  - dotenv (environment configuration)
  - body-parser (request parsing)

## 📦 Installation Steps

### 1. Install Node.js
Download and install Node.js from: https://nodejs.org/
Verify installation:
```bash
node --version
npm --version
```

### 2. Install Dependencies
Navigate to the project directory and run:
```bash
npm install
```

This will install:
- express
- mysql2
- cors
- dotenv
- body-parser
- nodemon (dev dependency)

### 3. Configure Database Connection

#### Update `.env` file with your MySQL credentials:
```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=ecoplate_db
DB_PORT=3306

PORT=3000
NODE_ENV=development
```

#### Create the Database
1. Open MySQL Workbench or MySQL command line
2. Run your existing `create.sql` file to create all tables
3. Run your existing `load.sql` file to load sample data

```sql
-- In MySQL
CREATE DATABASE ecoplate_db;
USE ecoplate_db;

-- Then run your create.sql and load.sql files
SOURCE /path/to/create.sql;
SOURCE /path/to/load.sql;
```

### 4. Start the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## 🌐 Connecting Frontend to Backend

### Update Your HTML Files

#### For browse.html (product browsing page):
Replace the existing `index.js` with the new version that includes API calls.

1. Copy the new `index.js` file to your frontend directory
2. Make sure `browse.html` includes this script:
```html
<script src="index.js"></script>
```

#### For donation.html (donor submission form):
Add this JavaScript to handle form submission:

```html
<script>
const API_BASE_URL = 'http://localhost:3000/api';

async function submitDonation(event) {
    event.preventDefault();
    
    const formData = {
        donor_id: document.getElementById('donor_id').value,
        status: 'available',
        products: [
            {
                product_id: document.getElementById('product_id').value,
                quantity: document.getElementById('quantity').value
            }
        ]
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/donations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Donation submitted successfully!');
            // Reset form or redirect
            event.target.reset();
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        alert('Cannot connect to server. Please try again.');
        console.error(error);
    }
}
</script>
```

### Enable CORS in Your HTML
Since you're making API calls from your HTML files, you need to:

1. **Either:** Open your HTML files through the same server (recommended)
   - Move your HTML/CSS/JS files to a `public` folder in this project
   - Add this line to `server.js` after the middleware section:
   ```javascript
   app.use(express.static('public'));
   ```
   - Access your site at `http://localhost:3000/index.html`

2. **Or:** Keep HTML files separate and use CORS (already configured)
   - Just open your HTML files in a browser
   - The backend CORS is already enabled to accept requests

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/available` - Get available products with donor info
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Donations
- `GET /api/donations` - Get all donations
- `GET /api/donations/:id` - Get single donation with products
- `POST /api/donations` - Create new donation
- `PUT /api/donations/:id` - Update donation status
- `DELETE /api/donations/:id` - Delete donation
- `GET /api/donations/donor/:donorId` - Get donations by donor
- `GET /api/donations/recipient/:recipientId` - Get donations by recipient

### Donors
- `GET /api/donors` - Get all donors
- `GET /api/donors/:id` - Get single donor
- `POST /api/donors` - Create new donor
- `PUT /api/donors/:id` - Update donor
- `DELETE /api/donors/:id` - Delete donor

### Recipients
- `GET /api/recipients` - Get all recipients
- `GET /api/recipients/:id` - Get single recipient
- `POST /api/recipients` - Create new recipient
- `PUT /api/recipients/:id` - Update recipient
- `DELETE /api/recipients/:id` - Delete recipient
- `POST /api/recipients/:id/request` - Submit product request
- `GET /api/recipients/:id/requests` - Get recipient's requests

## 🧪 Testing the API

### Using Browser
Visit: `http://localhost:3000/api/products`

### Using Postman
1. Download Postman: https://www.postman.com/downloads/
2. Import the endpoints from the API documentation
3. Test each endpoint with sample data

### Using curl
```bash
# Get all products
curl http://localhost:3000/api/products

# Create a new donor
curl -X POST http://localhost:3000/api/donors \
  -H "Content-Type: application/json" \
  -d '{"name":"New Donor","phone_num":"123-456-7890","email":"donor@example.com"}'
```

## 📝 Project Structure
```
ecoplate-backend/
├── config/
│   └── database.js          # Database connection configuration
├── routes/
│   ├── products.js          # Product endpoints
│   ├── donations.js         # Donation endpoints
│   ├── donors.js            # Donor endpoints
│   └── recipients.js        # Recipient endpoints
├── .env                     # Environment variables (DO NOT COMMIT)
├── server.js                # Main server file
├── package.json             # Dependencies
└── README.md                # This file
```

## ✅ Input Validation

The backend includes comprehensive validation:

### Products
- All fields required (category, name, expiration_date, quantity)
- Quantity must be > 0

### Donors
- All fields required (name, phone_num, email)
- Email must be valid format
- Email must be unique

### Donations
- donor_id required
- status must be: available, pending, completed, or cancelled
- If products provided, each must have product_id and quantity

### Recipients
- Only name is required
- Email validated if provided
- Capacity must be >= 0 if provided

## 🐛 Troubleshooting

### "Cannot GET /api/products"
- Make sure server is running (`npm start`)
- Check console for any error messages
- Verify database connection in `.env`

### "CORS Error"
- CORS is enabled by default
- If still issues, make sure you're accessing from `http://` not `file://`

### Database Connection Errors
- Verify MySQL is running
- Check credentials in `.env` file
- Ensure database `ecoplate_db` exists
- Run `create.sql` if tables don't exist

### Port Already in Use
- Change PORT in `.env` to a different number (e.g., 3001)
- Or stop the process using port 3000

## 📊 Phase 4 Requirements Checklist

✅ Database connectivity from HTML forms to MySQL  
✅ Full CRUD operations (Create, Read, Update, Delete)  
✅ User input validation with error flagging  
✅ Display query results in forms and reports  
✅ Functional donor interface  
✅ Functional recipient interface  

## 🚀 Next Steps

1. **Test all endpoints** using Postman or curl
2. **Update your HTML forms** to submit to the backend
3. **Add user authentication** (optional but recommended)
4. **Deploy** to a hosting service (Heroku, Railway, etc.)

## 📞 Support

If you encounter issues:
1. Check the console logs in your terminal
2. Verify database connection
3. Test endpoints individually
4. Review the API documentation below

---

Good luck with your Phase 4 submission! 🎉
