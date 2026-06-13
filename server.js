const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { initializeDatabase } = require('./models/mysqlDatabase');
const productRoutes = require('./routes/products');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// ===== MONGODB CONNECTION =====
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/products_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✓ MongoDB connected successfully');
  } catch (error) {
    console.error('✗ MongoDB connection error:', error.message);
    // Don't exit, allow app to run even if MongoDB fails
  }
};

// ===== MYSQL INITIALIZATION =====
const initMySQL = async () => {
  try {
    await initializeDatabase();
  } catch (error) {
    console.error('✗ MySQL initialization error:', error.message);
    // Don't exit, allow app to run even if MySQL fails
  }
};

// ===== ROUTES =====
// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Product CRUD API',
    version: '1.0.0',
    endpoints: {
      mongodb: {
        create: 'POST /nosql/products',
        readAll: 'GET /nosql/products',
        readOne: 'GET /nosql/products/:id',
        update: 'PUT /nosql/products/:id',
        delete: 'DELETE /nosql/products/:id'
      },
      mysql: {
        create: 'POST /sql/products',
        readAll: 'GET /sql/products',
        readOne: 'GET /sql/products/:id',
        update: 'PUT /sql/products/:id',
        delete: 'DELETE /sql/products/:id'
      }
    }
  });
});

// Product routes
app.use('/api', productRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// ===== START SERVER =====
const startServer = async () => {
  try {
    // Initialize connections
    await connectMongoDB();
    await initMySQL();

    // Start listening
    app.listen(PORT, () => {
      console.log(`\n🚀 Server is running on port ${PORT}`);
      console.log(`📝 API documentation available at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
