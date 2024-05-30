// cart.model.js
const mongoose = require("mongoose");
const Product = require('./product.model')
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Assuming you have a Product model
    required: true
  },
  user: {
    type: String,
    ref: 'User', // Reference to the User model
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model("Cart", cartItemSchema);

module.exports = Cart; // Export the schema, not the model
