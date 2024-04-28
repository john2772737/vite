const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  category: String,
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
