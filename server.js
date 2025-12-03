const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests from your frontend
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});


// Import routes
const productsRouter = require('./routes/products');
const donationsRouter = require('./routes/donations');
const donorsRouter = require('./routes/donors');
const recipientsRouter = require('./routes/recipients');

// Use routes
app.use('/api/products', productsRouter);
app.use('/api/donations', donationsRouter);
app.use('/api/donors', donorsRouter);
app.use('/api/recipients', recipientsRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to EcoPlate API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      donations: '/api/donations',
      donors: '/api/donors',
      recipients: '/api/recipients'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`===========================================`);
  console.log(`EcoPlate Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API Base URL: http://localhost:${PORT}/api`);
  console.log(`===========================================`);
});

module.exports = app;
