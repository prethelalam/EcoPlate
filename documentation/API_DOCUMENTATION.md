# EcoPlate API Documentation

Base URL: `http://localhost:3000/api`

All responses follow this format:
```json
{
  "success": true/false,
  "message": "Optional message",
  "data": { ... },
  "error": "Optional error message"
}
```

---

## 🍎 Products API

### GET /products
Get all products in the database.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "category": "Fruit",
      "name": "Apples",
      "expiration_date": "2025-12-15",
      "quantity": 50
    }
  ],
  "count": 1
}
```

### GET /products/available
Get all available products with donor information.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "category": "Fruit",
      "name": "Apples",
      "expiration_date": "2025-12-15",
      "quantity": 50,
      "donor_name": "Dining Hall West",
      "donor_email": "west@utdallas.edu"
    }
  ],
  "count": 1
}
```

### GET /products/:id
Get a single product by ID.

**Example:** `GET /products/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "category": "Fruit",
    "name": "Apples",
    "expiration_date": "2025-12-15",
    "quantity": 50
  }
}
```

### POST /products
Create a new product.

**Request Body:**
```json
{
  "category": "Vegetable",
  "name": "Carrots",
  "expiration_date": "2025-12-20",
  "quantity": 30
}
```

**Validation Rules:**
- All fields required
- quantity must be > 0

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 11,
    "category": "Vegetable",
    "name": "Carrots",
    "expiration_date": "2025-12-20",
    "quantity": 30
  }
}
```

### PUT /products/:id
Update an existing product.

**Example:** `PUT /products/1`

**Request Body:**
```json
{
  "category": "Fruit",
  "name": "Apples",
  "expiration_date": "2025-12-15",
  "quantity": 45
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": 1,
    "category": "Fruit",
    "name": "Apples",
    "expiration_date": "2025-12-15",
    "quantity": 45
  }
}
```

### DELETE /products/:id
Delete a product.

**Example:** `DELETE /products/1`

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## 🎁 Donations API

### GET /donations
Get all donations with donor and recipient information.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "status": "available",
      "donation_date": "2025-12-01T00:00:00.000Z",
      "donor_name": "Dining Hall West",
      "donor_email": "west@utdallas.edu",
      "recipient_name": null,
      "recipient_email": null
    }
  ],
  "count": 1
}
```

### GET /donations/:id
Get a single donation with its products.

**Example:** `GET /donations/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "available",
    "donation_date": "2025-12-01T00:00:00.000Z",
    "donor_id": 1,
    "recipient_id": null,
    "donor_name": "Dining Hall West",
    "donor_email": "west@utdallas.edu",
    "donor_phone": "972-883-2111",
    "products": [
      {
        "id": 1,
        "name": "Apples",
        "category": "Fruit",
        "quantity": 10
      }
    ]
  }
}
```

### POST /donations
Create a new donation.

**Request Body:**
```json
{
  "donor_id": 1,
  "recipient_id": null,
  "status": "available",
  "donation_date": "2025-12-02",
  "products": [
    {
      "product_id": 1,
      "quantity": 10
    },
    {
      "product_id": 2,
      "quantity": 5
    }
  ]
}
```

**Validation Rules:**
- donor_id required
- status must be one of: available, pending, completed, cancelled
- If products provided, each must have product_id and quantity

**Response:**
```json
{
  "success": true,
  "message": "Donation created successfully",
  "data": {
    "id": 6,
    "status": "available",
    "donor_id": 1,
    "recipient_id": null,
    "donation_date": "2025-12-02"
  }
}
```

### PUT /donations/:id
Update a donation (typically to change status or assign recipient).

**Example:** `PUT /donations/1`

**Request Body:**
```json
{
  "status": "pending",
  "recipient_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Donation updated successfully"
}
```

### DELETE /donations/:id
Delete a donation.

**Example:** `DELETE /donations/1`

**Response:**
```json
{
  "success": true,
  "message": "Donation deleted successfully"
}
```

### GET /donations/donor/:donorId
Get all donations by a specific donor.

**Example:** `GET /donations/donor/1`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "status": "available",
      "donation_date": "2025-12-01T00:00:00.000Z",
      "recipient_name": null
    }
  ],
  "count": 1
}
```

### GET /donations/recipient/:recipientId
Get all donations for a specific recipient.

**Example:** `GET /donations/recipient/1`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "status": "completed",
      "donation_date": "2025-11-28T00:00:00.000Z",
      "donor_name": "Tom Thumb"
    }
  ],
  "count": 1
}
```

---

## 👤 Donors API

### GET /donors
Get all donors.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Dining Hall West",
      "phone_num": "972-883-2111",
      "email": "west@utdallas.edu"
    }
  ],
  "count": 1
}
```

### GET /donors/:id
Get a single donor.

**Example:** `GET /donors/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Dining Hall West",
    "phone_num": "972-883-2111",
    "email": "west@utdallas.edu"
  }
}
```

### POST /donors
Create a new donor.

**Request Body:**
```json
{
  "name": "New Restaurant",
  "phone_num": "214-555-0100",
  "email": "contact@newrestaurant.com"
}
```

**Validation Rules:**
- All fields required
- Email must be valid format
- Email must be unique

**Response:**
```json
{
  "success": true,
  "message": "Donor created successfully",
  "data": {
    "id": 6,
    "name": "New Restaurant",
    "phone_num": "214-555-0100",
    "email": "contact@newrestaurant.com"
  }
}
```

### PUT /donors/:id
Update a donor.

**Example:** `PUT /donors/1`

**Request Body:**
```json
{
  "name": "Dining Hall West",
  "phone_num": "972-883-2222",
  "email": "west@utdallas.edu"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Donor updated successfully",
  "data": {
    "id": 1,
    "name": "Dining Hall West",
    "phone_num": "972-883-2222",
    "email": "west@utdallas.edu"
  }
}
```

### DELETE /donors/:id
Delete a donor.

**Example:** `DELETE /donors/1`

**Response:**
```json
{
  "success": true,
  "message": "Donor deleted successfully"
}
```

---

## 🏢 Recipients API

### GET /recipients
Get all recipients.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "North Texas Food Bank",
      "phone_num": "214-330-1396",
      "email": "info@ntfb.org",
      "capacity": 1000
    }
  ],
  "count": 1
}
```

### GET /recipients/:id
Get a single recipient.

**Example:** `GET /recipients/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "North Texas Food Bank",
    "phone_num": "214-330-1396",
    "email": "info@ntfb.org",
    "capacity": 1000
  }
}
```

### POST /recipients
Create a new recipient.

**Request Body:**
```json
{
  "name": "New Food Pantry",
  "phone_num": "214-555-0200",
  "email": "contact@newfoodpantry.org",
  "capacity": 500
}
```

**Validation Rules:**
- name required (other fields optional)
- Email must be valid format if provided
- capacity must be >= 0 if provided

**Response:**
```json
{
  "success": true,
  "message": "Recipient created successfully",
  "data": {
    "id": 6,
    "name": "New Food Pantry",
    "phone_num": "214-555-0200",
    "email": "contact@newfoodpantry.org",
    "capacity": 500
  }
}
```

### PUT /recipients/:id
Update a recipient.

**Example:** `PUT /recipients/1`

**Request Body:**
```json
{
  "name": "North Texas Food Bank",
  "phone_num": "214-330-1396",
  "email": "info@ntfb.org",
  "capacity": 1200
}
```

**Response:**
```json
{
  "success": true,
  "message": "Recipient updated successfully",
  "data": {
    "id": 1,
    "name": "North Texas Food Bank",
    "phone_num": "214-330-1396",
    "email": "info@ntfb.org",
    "capacity": 1200
  }
}
```

### DELETE /recipients/:id
Delete a recipient.

**Example:** `DELETE /recipients/1`

**Response:**
```json
{
  "success": true,
  "message": "Recipient deleted successfully"
}
```

### POST /recipients/:id/request
Submit a product request from a recipient.

**Example:** `POST /recipients/1/request`

**Request Body:**
```json
{
  "product_id": 1,
  "quantity": 10
}
```

**Validation Rules:**
- product_id and quantity required
- quantity must be > 0
- Product must exist
- Product must have sufficient quantity available

**Response:**
```json
{
  "success": true,
  "message": "Product request submitted successfully",
  "data": {
    "recipient_id": 1,
    "product_id": 1,
    "quantity": 10
  }
}
```

### GET /recipients/:id/requests
Get all product requests for a recipient.

**Example:** `GET /recipients/1/requests`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "Product_id": 1,
      "quantity": 10,
      "name": "Apples",
      "category": "Fruit",
      "expiration_date": "2025-12-15"
    }
  ],
  "count": 1
}
```

---

## 🚨 Error Responses

All error responses follow this format:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (in development mode only)"
}
```

---

## 📝 Testing Examples with curl

### Get all products
```bash
curl http://localhost:3000/api/products
```

### Create a new donor
```bash
curl -X POST http://localhost:3000/api/donors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Restaurant",
    "phone_num": "214-555-1234",
    "email": "test@restaurant.com"
  }'
```

### Create a donation with products
```bash
curl -X POST http://localhost:3000/api/donations \
  -H "Content-Type: application/json" \
  -d '{
    "donor_id": 1,
    "status": "available",
    "products": [
      {"product_id": 1, "quantity": 10},
      {"product_id": 2, "quantity": 5}
    ]
  }'
```

### Update donation status
```bash
curl -X PUT http://localhost:3000/api/donations/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed",
    "recipient_id": 1
  }'
```

### Submit product request
```bash
curl -X POST http://localhost:3000/api/recipients/1/request \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 1,
    "quantity": 5
  }'
```

---

## 🔐 Notes

- All endpoints use JSON for request/response bodies
- CORS is enabled for all origins
- Input validation is performed on all POST/PUT requests
- Foreign key constraints are enforced (CASCADE DELETE enabled)
- Timestamps are returned in ISO format
- Email uniqueness is enforced for donors
