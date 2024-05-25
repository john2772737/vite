const mongoose = require('mongoose');
const Seller = require("../models/seller.model");

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: Number, // Removed an unnecessary comma
  category: String,
  imageUrl: String,
  totalItem: {
    type: Number,
    default: 0 // Added a default value
  },
  totalSold: {
    type: Number,
    default: 0
  },
  remainingItem: {
    type: Number,
    default: 0
  },
  seller: {
    type:String,
    ref: 'Seller'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
