const express = require('express');
const noSQLController = require('../controllers/noSQLcontroller');
const SQLController = require('../controllers/SQLcontroller');

const router = express.Router();

// ===== MONGODB (NoSQL) ROUTES =====
// CREATE
router.post('/nosql/products', noSQLController.createProduct);

// READ ALL
router.get('/nosql/products', noSQLController.getAllProducts);

// READ ONE
router.get('/nosql/products/:id', noSQLController.getProductById);

// UPDATE
router.put('/nosql/products/:id', noSQLController.updateProduct);

// DELETE
router.delete('/nosql/products/:id', noSQLController.deleteProduct);

// ===== MYSQL (SQL) ROUTES =====
// CREATE
router.post('/sql/products', SQLController.createProduct);

// READ ALL
router.get('/sql/products', SQLController.getAllProducts);

// READ ONE
router.get('/sql/products/:id', SQLController.getProductById);

// UPDATE
router.put('/sql/products/:id', SQLController.updateProduct);

// DELETE
router.delete('/sql/products/:id', SQLController.deleteProduct);

module.exports = router;
