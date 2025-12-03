const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET all products (for browse page)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.id,
        p.category,
        p.name,
        p.expiration_date,
        p.quantity
      FROM Product p
      WHERE p.quantity > 0
      ORDER BY p.expiration_date ASC
    `);
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

// GET available products with donor information
router.get('/available', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.id,
        p.category,
        p.name,
        p.expiration_date,
        p.quantity,
        d.name as donor_name,
        d.email as donor_email
      FROM Product p
      LEFT JOIN Donated_as da ON p.id = da.Product_id
      LEFT JOIN Donation don ON da.Donation_id = don.id
      LEFT JOIN Donor d ON don.donor_id = d.id
      WHERE p.quantity > 0 AND don.status = 'available'
      ORDER BY p.expiration_date ASC
    `);
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching available products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching available products',
      error: error.message
    });
  }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM Product WHERE id = ?',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
});

// POST create new product
router.post('/', async (req, res) => {
  try {
    const { category, name, expiration_date, quantity } = req.body;
    
    // Validate required fields
    if (!category || !name || !expiration_date || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: category, name, expiration_date, quantity'
      });
    }
    
    // Validate quantity is positive
    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be greater than 0'
      });
    }
    
    const [result] = await db.query(
      'INSERT INTO Product (category, name, expiration_date, quantity) VALUES (?, ?, ?, ?)',
      [category, name, expiration_date, quantity]
    );
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: {
        id: result.insertId,
        category,
        name,
        expiration_date,
        quantity
      }
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
});

// PUT update product
router.put('/:id', async (req, res) => {
  try {
    const { category, name, expiration_date, quantity } = req.body;
    const productId = req.params.id;
    
    // Check if product exists
    const [existing] = await db.query('SELECT * FROM Product WHERE id = ?', [productId]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Validate quantity if provided
    if (quantity !== undefined && quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity cannot be negative'
      });
    }
    
    await db.query(
      'UPDATE Product SET category = ?, name = ?, expiration_date = ?, quantity = ? WHERE id = ?',
      [category, name, expiration_date, quantity, productId]
    );
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: {
        id: productId,
        category,
        name,
        expiration_date,
        quantity
      }
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    
    // Check if product exists
    const [existing] = await db.query('SELECT * FROM Product WHERE id = ?', [productId]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    await db.query('DELETE FROM Product WHERE id = ?', [productId]);
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
});

module.exports = router;