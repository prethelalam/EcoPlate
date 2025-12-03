const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET all recipients
router.get('/recipients', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Recipient ORDER BY name ASC');
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching recipients:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recipients',
      error: error.message
    });
  }
});

// GET single recipient by ID
router.get('/recipients/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Recipient WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Recipient not found'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching recipient:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recipient',
      error: error.message
    });
  }
});

// POST create new recipient
router.post('/recipients', async (req, res) => {
  try {
    const { name, phone_num, email, capacity } = req.body;
    
    // Validate required fields (only name is required in schema)
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }
    
    // Validate email format if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }
    }
    
    // Validate capacity if provided
    if (capacity !== undefined && capacity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Capacity cannot be negative'
      });
    }
    
    const [result] = await db.query(
      'INSERT INTO Recipient (name, phone_num, email, capacity) VALUES (?, ?, ?, ?)',
      [name, phone_num || null, email || null, capacity || null]
    );
    
    res.status(201).json({
      success: true,
      message: 'Recipient created successfully',
      data: {
        id: result.insertId,
        name,
        phone_num: phone_num || null,
        email: email || null,
        capacity: capacity || null
      }
    });
  } catch (error) {
    console.error('Error creating recipient:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating recipient',
      error: error.message
    });
  }
});

// PUT update recipient
router.put('/recipients/:id', async (req, res) => {
  try {
    const { name, phone_num, email, capacity } = req.body;
    const recipientId = req.params.id;
    
    // Check if recipient exists
    const [existing] = await db.query('SELECT * FROM Recipient WHERE id = ?', [recipientId]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Recipient not found'
      });
    }
    
    // Validate email format if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }
    }
    
    // Validate capacity if provided
    if (capacity !== undefined && capacity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Capacity cannot be negative'
      });
    }
    
    await db.query(
      'UPDATE Recipient SET name = ?, phone_num = ?, email = ?, capacity = ? WHERE id = ?',
      [name, phone_num, email, capacity, recipientId]
    );
    
    res.json({
      success: true,
      message: 'Recipient updated successfully',
      data: {
        id: recipientId,
        name,
        phone_num,
        email,
        capacity
      }
    });
  } catch (error) {
    console.error('Error updating recipient:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating recipient',
      error: error.message
    });
  }
});

// DELETE recipient
router.delete('/recipients/:id', async (req, res) => {
  try {
    const recipientId = req.params.id;
    
    // Check if recipient exists
    const [existing] = await db.query('SELECT * FROM Recipient WHERE id = ?', [recipientId]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Recipient not found'
      });
    }
    
    // CASCADE DELETE will handle related records
    await db.query('DELETE FROM Recipient WHERE id = ?', [recipientId]);
    
    res.json({
      success: true,
      message: 'Recipient deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting recipient:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting recipient',
      error: error.message
    });
  }
});

// POST recipient requests a product (MENU_SELECTION)
router.post('/recipients/:id/request', async (req, res) => {
  try {
    const recipientId = req.params.id;
    const { product_id, quantity } = req.body;
    
    // Validate required fields
    if (!product_id || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'product_id and quantity are required'
      });
    }
    
    // Validate quantity
    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be greater than 0'
      });
    }
    
    // Check if recipient exists
    const [recipient] = await db.query('SELECT * FROM Recipient WHERE id = ?', [recipientId]);
    if (recipient.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Recipient not found'
      });
    }
    
    // Check if product exists and has enough quantity
    const [product] = await db.query('SELECT * FROM Product WHERE id = ?', [product_id]);
    if (product.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    if (product[0].quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient quantity available. Only ${product[0].quantity} units available.`
      });
    }
    
    // Insert into MENU_SELECTION
    await db.query(
      'INSERT INTO MENU_SELECTION (Product_id, recipient_id, quantity) VALUES (?, ?, ?)',
      [product_id, recipientId, quantity]
    );
    
    res.status(201).json({
      success: true,
      message: 'Product request submitted successfully',
      data: {
        recipient_id: recipientId,
        product_id,
        quantity
      }
    });
  } catch (error) {
    console.error('Error submitting product request:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting product request',
      error: error.message
    });
  }
});

// GET recipient's requested products
router.get('/recipients/:id/requests', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        ms.Product_id,
        ms.quantity,
        p.name,
        p.category,
        p.expiration_date
      FROM MENU_SELECTION ms
      JOIN Product p ON ms.Product_id = p.id
      WHERE ms.recipient_id = ?
    `, [req.params.id]);
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching recipient requests:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recipient requests',
      error: error.message
    });
  }
});

module.exports = router;
