const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET all donations
router.get('/donations', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        don.id,
        don.status,
        don.donation_date,
        donor.name as donor_name,
        donor.email as donor_email,
        recipient.name as recipient_name,
        recipient.email as recipient_email
      FROM Donation don
      LEFT JOIN Donor donor ON don.donor_id = donor.id
      LEFT JOIN Recipient recipient ON don.recipient_id = recipient.id
      ORDER BY don.donation_date DESC
    `);
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donations',
      error: error.message
    });
  }
});

// GET single donation by ID
router.get('/donations/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        don.id,
        don.status,
        don.donation_date,
        don.donor_id,
        don.recipient_id,
        donor.name as donor_name,
        donor.email as donor_email,
        donor.phone_num as donor_phone,
        recipient.name as recipient_name,
        recipient.email as recipient_email,
        recipient.phone_num as recipient_phone
      FROM Donation don
      LEFT JOIN Donor donor ON don.donor_id = donor.id
      LEFT JOIN Recipient recipient ON don.recipient_id = recipient.id
      WHERE don.id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }
    
    // Get products associated with this donation
    const [products] = await db.query(`
      SELECT 
        p.id,
        p.name,
        p.category,
        da.quantity
      FROM Donated_as da
      JOIN Product p ON da.Product_id = p.id
      WHERE da.Donation_id = ?
    `, [req.params.id]);
    
    res.json({
      success: true,
      data: {
        ...rows[0],
        products: products
      }
    });
  } catch (error) {
    console.error('Error fetching donation:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donation',
      error: error.message
    });
  }
});

// POST create new donation
router.post('/donations', async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const { donor_id, recipient_id, status, donation_date, products } = req.body;
    
    // Validate required fields
    if (!donor_id || !status) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: 'donor_id and status are required'
      });
    }
    
    // Validate status value
    const validStatuses = ['available', 'pending', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: 'Status must be one of: available, pending, completed, cancelled'
      });
    }
    
    // Insert donation
    const [result] = await connection.query(
      'INSERT INTO Donation (status, donor_id, recipient_id, donation_date) VALUES (?, ?, ?, ?)',
      [status, donor_id, recipient_id || null, donation_date || new Date()]
    );
    
    const donationId = result.insertId;
    
    // If products are provided, link them to the donation
    if (products && Array.isArray(products) && products.length > 0) {
      for (const product of products) {
        if (!product.product_id || !product.quantity) {
          await connection.rollback();
          return res.status(400).json({
            success: false,
            message: 'Each product must have product_id and quantity'
          });
        }
        
        await connection.query(
          'INSERT INTO Donated_as (Product_id, Donation_id, quantity) VALUES (?, ?, ?)',
          [product.product_id, donationId, product.quantity]
        );
      }
    }
    
    await connection.commit();
    
    res.status(201).json({
      success: true,
      message: 'Donation created successfully',
      data: {
        id: donationId,
        status,
        donor_id,
        recipient_id,
        donation_date: donation_date || new Date()
      }
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error creating donation:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating donation',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// PUT update donation
router.put('/donations/:id', async (req, res) => {
  try {
    const { status, recipient_id } = req.body;
    const donationId = req.params.id;
    
    // Check if donation exists
    const [existing] = await db.query('SELECT * FROM Donation WHERE id = ?', [donationId]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }
    
    // Validate status if provided
    if (status) {
      const validStatuses = ['available', 'pending', 'completed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Status must be one of: available, pending, completed, cancelled'
        });
      }
    }
    
    // Build dynamic update query
    let updateFields = [];
    let updateValues = [];
    
    if (status) {
      updateFields.push('status = ?');
      updateValues.push(status);
    }
    
    if (recipient_id !== undefined) {
      updateFields.push('recipient_id = ?');
      updateValues.push(recipient_id);
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }
    
    updateValues.push(donationId);
    
    await db.query(
      `UPDATE Donation SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );
    
    res.json({
      success: true,
      message: 'Donation updated successfully'
    });
  } catch (error) {
    console.error('Error updating donation:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating donation',
      error: error.message
    });
  }
});

// DELETE donation
router.delete('/donations/:id', async (req, res) => {
  try {
    const donationId = req.params.id;
    
    // Check if donation exists
    const [existing] = await db.query('SELECT * FROM Donation WHERE id = ?', [donationId]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }
    
    // The CASCADE DELETE in your schema will handle related records in Donated_as
    await db.query('DELETE FROM Donation WHERE id = ?', [donationId]);
    
    res.json({
      success: true,
      message: 'Donation deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting donation:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting donation',
      error: error.message
    });
  }
});

// GET donations by donor ID
router.get('/donations/donor/:donorId', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        don.id,
        don.status,
        don.donation_date,
        recipient.name as recipient_name
      FROM Donation don
      LEFT JOIN Recipient recipient ON don.recipient_id = recipient.id
      WHERE don.donor_id = ?
      ORDER BY don.donation_date DESC
    `, [req.params.donorId]);
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching donor donations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donor donations',
      error: error.message
    });
  }
});

// GET donations by recipient ID
router.get('/donations/recipient/:recipientId', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        don.id,
        don.status,
        don.donation_date,
        donor.name as donor_name
      FROM Donation don
      LEFT JOIN Donor donor ON don.donor_id = donor.id
      WHERE don.recipient_id = ?
      ORDER BY don.donation_date DESC
    `, [req.params.recipientId]);
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching recipient donations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recipient donations',
      error: error.message
    });
  }
});

module.exports = router;
