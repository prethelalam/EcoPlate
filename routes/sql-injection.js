const express = require('express');
const router = express.Router();
const db = require('../config/database');

// PART A: 
router.post('/vulnerable-login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // VULNERABLE: String concatenation - DO NOT USE IN PRODUCTION!
    // This query is intentionally vulnerable to demonstrate SQL injection
    const vulnerableQuery = `
      SELECT id, name, email 
      FROM Donor 
      WHERE name = '${username}' AND phone_num = '${password}'
    `;
    
    console.log('Executing vulnerable query:', vulnerableQuery);
    
    // Execute the vulnerable query
    const [rows] = await db.query(vulnerableQuery);
    
    res.json({
      success: true,
      query: vulnerableQuery,
      results: rows,
      vulnerability: 'This query uses string concatenation and is vulnerable to SQL injection'
    });
    
  } catch (error) {
    console.error('Error in vulnerable login:', error);
    res.status(500).json({
      success: false,
      message: 'Error executing query',
      query: error.sql || 'Query failed',
      error: error.message
    });
  }
});

// PART B: 
router.post('/protected-login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Detect common SQL injection patterns
    const injectionPatterns = [
      /'/gi,           // Single quotes
      /--/gi,          // SQL comments
      /#/gi,           // MySQL comments
      /;/gi,           // Statement terminators
      /\bOR\b/gi,      // OR keyword
      /\bAND\b/gi,     // AND keyword
      /\bUNION\b/gi,   // UNION keyword
      /\bDROP\b/gi,    // DROP keyword
      /\bDELETE\b/gi   // DELETE keyword
    ];
    
    let injectionAttempt = false;
    for (const pattern of injectionPatterns) {
      if (pattern.test(username) || pattern.test(password)) {
        injectionAttempt = true;
        break;
      }
    }
    
    // SECURE: Prepared statement with parameterized query
    const protectedQuery = `
      SELECT id, name, email 
      FROM Donor 
      WHERE name = ? AND phone_num = ?
    `;
    
    console.log('Executing protected query with parameters:', {username, password});
    console.log('Query template:', protectedQuery);
    
    // Execute the prepared statement
    // The ? placeholders are replaced with escaped values
    const [rows] = await db.query(protectedQuery, [username, password]);
    
    if (rows.length > 0) {
      res.json({
        success: true,
        query: protectedQuery + `\nParameters: ['${username}', '${password}']`,
        user: rows[0],
        protection: 'This query uses prepared statements and is protected against SQL injection',
        injectionAttempt: injectionAttempt
      });
    } else {
      res.json({
        success: false,
        query: protectedQuery + `\nParameters: ['${username}', '${password}']`,
        message: 'Invalid username or password',
        protection: 'This query uses prepared statements and is protected against SQL injection',
        injectionAttempt: injectionAttempt
      });
    }
    
  } catch (error) {
    console.error('Error in protected login:', error);
    res.status(500).json({
      success: false,
      message: 'Error executing query',
      error: error.message
    });
  }
});

// HELPER: Setup test data (optional)
router.post('/setup-test-data', async (req, res) => {
  try {
    // Check if test user exists
    const [existing] = await db.query(
      "SELECT * FROM Donor WHERE name = 'admin'"
    );
    
    if (existing.length === 0) {
      // Create test user
      await db.query(
        "INSERT INTO Donor (name, phone_num, email) VALUES ('admin', 'admin123', 'admin@test.com')"
      );
      
      res.json({
        success: true,
        message: 'Test user created: username=admin, password=admin123'
      });
    } else {
      res.json({
        success: true,
        message: 'Test user already exists: username=admin, password=admin123'
      });
    }
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error setting up test data',
      error: error.message
    });
  }
});

module.exports = router;