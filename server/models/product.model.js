const mongoose = require('mongoose');
const Seller = require("../models/seller.model");

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: Number,
  category: String,
  imageUrl: String,
  totalItem: {
    type: Number,
    default: 0
  },
  totalSold: {
    type: Number,
    default: 0
  },
  totalIncome: {
    type: Number,
    default: 0
  },
  remainingItem: {
    type: Number,
    default: function() {
      return this.totalItem - this.totalSold; // Calculate remaining item
    }
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

productSchema.post('findOneAndUpdate', async function(doc) {
  // Recalculate remainingItem after update
  const updatedProduct = await this.model.findOne({ _id: doc._id });
  updatedProduct.remainingItem = updatedProduct.totalItem - updatedProduct.totalSold;
  await updatedProduct.save();
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
