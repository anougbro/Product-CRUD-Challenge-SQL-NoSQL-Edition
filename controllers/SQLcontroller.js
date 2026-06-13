const { pool } = require('../models/mysqlDatabase');

// ===== CREATE =====
/**
 * Create a new product
 * POST /sql/products
 */
const createProduct = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { name, price, category, inStock } = req.body;

    // Validate required fields
    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name and price are required fields'
      });
    }

    // Parameterized query to prevent SQL injection
    const insertQuery = `
      INSERT INTO products (name, price, category, inStock)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await connection.execute(insertQuery, [
      name,
      parseFloat(price),
      category || null,
      inStock !== undefined ? inStock : true
    ]);

    // Fetch the created product
    const [createdProduct] = await connection.execute(
      'SELECT * FROM products WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: createdProduct[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  } finally {
    connection.release();
  }
};

// ===== READ ALL =====
/**
 * Get all products
 * GET /sql/products
 */
const getAllProducts = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    // Optional: Add pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Get products with pagination
    const [products] = await connection.execute(
      'SELECT * FROM products ORDER BY createdAt DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    // Get total count
    const [countResult] = await connection.execute(
      'SELECT COUNT(*) as total FROM products'
    );

    const totalCount = countResult[0].total;

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalProducts: totalCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving products',
      error: error.message
    });
  } finally {
    connection.release();
  }
};

// ===== READ ONE =====
/**
 * Get a single product by ID
 * GET /sql/products/:id
 */
const getProductById = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { id } = req.params;

    // Validate ID is a number
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    // Parameterized query
    const [products] = await connection.execute(
      'SELECT * FROM products WHERE id = ?',
      [parseInt(id)]
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: products[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving product',
      error: error.message
    });
  } finally {
    connection.release();
  }
};

// ===== UPDATE =====
/**
 * Update a product by ID
 * PUT /sql/products/:id
 */
const updateProduct = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { id } = req.params;
    const { name, price, category, inStock } = req.body;

    // Validate ID is a number
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    // Check if product exists
    const [existingProducts] = await connection.execute(
      'SELECT * FROM products WHERE id = ?',
      [parseInt(id)]
    );

    if (existingProducts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Build dynamic update query
    const updateFields = [];
    const updateValues = [];

    if (name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (price !== undefined) {
      updateFields.push('price = ?');
      updateValues.push(parseFloat(price));
    }
    if (category !== undefined) {
      updateFields.push('category = ?');
      updateValues.push(category);
    }
    if (inStock !== undefined) {
      updateFields.push('inStock = ?');
      updateValues.push(inStock);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }

    // Add ID to values array
    updateValues.push(parseInt(id));

    // Execute update query
    const updateQuery = `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`;
    await connection.execute(updateQuery, updateValues);

    // Fetch updated product
    const [updatedProduct] = await connection.execute(
      'SELECT * FROM products WHERE id = ?',
      [parseInt(id)]
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  } finally {
    connection.release();
  }
};

// ===== DELETE =====
/**
 * Delete a product by ID
 * DELETE /sql/products/:id
 */
const deleteProduct = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { id } = req.params;

    // Validate ID is a number
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    // Fetch product before deletion
    const [productsToDelete] = await connection.execute(
      'SELECT * FROM products WHERE id = ?',
      [parseInt(id)]
    );

    if (productsToDelete.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete product
    await connection.execute(
      'DELETE FROM products WHERE id = ?',
      [parseInt(id)]
    );

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: productsToDelete[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  } finally {
    connection.release();
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
