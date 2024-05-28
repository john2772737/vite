// cart.model.js
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Assuming you have a Product model
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

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = cartItemSchema; // Export the schema, not the model
