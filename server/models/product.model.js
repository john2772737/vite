const mongoose = require('mongoose');
const Seller = require("../models/seller.model");

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
  totalItem: {
    type: Number,
    required: true
  },
  totalSold: {
    type: Number,
    default: 0 // Assuming it starts from 0
  },
  remainingItem: {
    type: Number // Remove required: true
  },

  seller: [{
    type:String,
    ref: 'Seller'
}],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define a pre-save hook to calculate remainingItem
productSchema.pre('save', function(next) {
  this.remainingItem = this.totalItem - this.totalSold;
  next();
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
