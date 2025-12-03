const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET all donors
router.get('/donors', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Donor ORDER BY name ASC');
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donors',
      error: error.message
    });
  }
});

// GET single donor by ID
router.get('/donors/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Donor WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Donor not found'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching donor:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donor',
      error: error.message
    });
  }
});

// POST create new donor
router.post('/donors', async (req, res) => {
  try {
    const { name, phone_num, email } = req.body;
    
    // Validate required fields
    if (!name || !phone_num || !email) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, phone_num, email'
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Check if email already exists (email is UNIQUE in schema)
    const [existing] = await db.query('SELECT id FROM Donor WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'A donor with this email already exists'
      });
    }
    
    const [result] = await db.query(
      'INSERT INTO Donor (name, phone_num, email) VALUES (?, ?, ?)',
      [name, phone_num, email]
    );
    
    res.status(201).json({
      success: true,
      message: 'Donor created successfully',
      data: {
        id: result.insertId,
        name,
        phone_num,
        email
      }
    });
  } catch (error) {
    console.error('Error creating donor:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating donor',
      error: error.message
    });
  }
});

// PUT update donor
router.put('/donors/:id', async (req, res) => {
  try {
    const { name, phone_num, email } = req.body;
    const donorId = req.params.id;
    
    // Check if donor exists
    const [existing] = await db.query('SELECT * FROM Donor WHERE id = ?', [donorId]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Donor not found'
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
      
      // Check if new email already exists for a different donor
      const [emailCheck] = await db.query(
        'SELECT id FROM Donor WHERE email = ? AND id != ?',
        [email, donorId]
      );
      if (emailCheck.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'A donor with this email already exists'
        });
      }
    }
    
    await db.query(
      'UPDATE Donor SET name = ?, phone_num = ?, email = ? WHERE id = ?',
      [name, phone_num, email, donorId]
    );
    
    res.json({
      success: true,
      message: 'Donor updated successfully',
      data: {
        id: donorId,
        name,
        phone_num,
        email
      }
    });
  } catch (error) {
    console.error('Error updating donor:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating donor',
      error: error.message
    });
  }
});

// DELETE donor
router.delete('/donors/:id', async (req, res) => {
  try {
    const donorId = req.params.id;
    
    // Check if donor exists
    const [existing] = await db.query('SELECT * FROM Donor WHERE id = ?', [donorId]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Donor not found'
      });
    }
    
    // CASCADE DELETE will handle related Donation records
    await db.query('DELETE FROM Donor WHERE id = ?', [donorId]);
    
    res.json({
      success: true,
      message: 'Donor deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting donor:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting donor',
      error: error.message
    });
  }
});

module.exports = router;
