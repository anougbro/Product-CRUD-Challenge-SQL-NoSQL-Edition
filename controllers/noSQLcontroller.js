const Product = require('../models/mongoProduct');

// ===== CREATE =====
/**
 * Create a new product
 * POST /nosql/products
 */
const createProduct = async (req, res) => {
  try {
    const { name, price, category, inStock } = req.body;

    // Validate required fields
    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name and price are required fields'
      });
    }

    // Create new product document
    const newProduct = new Product({
      name,
      price,
      category: category || null,
      inStock: inStock !== undefined ? inStock : true
    });

    // Save to MongoDB
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: savedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
};

// ===== READ ALL =====
/**
 * Get all products
 * GET /nosql/products
 */
const getAllProducts = async (req, res) => {
  try {
    // Optional: Add filtering and pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalCount = await Product.countDocuments();

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
  }
};

// ===== READ ONE =====
/**
 * Get a single product by ID
 * GET /nosql/products/:id
 */
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving product',
      error: error.message
    });
  }
};

// ===== UPDATE =====
/**
 * Update a product by ID
 * PUT /nosql/products/:id
 */
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, inStock } = req.body;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    // Build update object (only include provided fields)
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = price;
    if (category !== undefined) updateData.category = category;
    if (inStock !== undefined) updateData.inStock = inStock;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }

    // Find and update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

// ===== DELETE =====
/**
 * Delete a product by ID
 * DELETE /nosql/products/:id
 */
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
