const mongoose = require('mongoose');

// Define the Product schema for MongoDB
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: 3
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0
    },
    category: {
      type: String,
      trim: true,
      default: null
    },
    inStock: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields
  }
);

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
