const mongoose = require('mongoose');
const User = require('./user.model'); // Assuming this is the correct path to your User model
const Product = require('./product.model'); // Assuming this is the correct path to your Product model

const orderSchema = new mongoose.Schema({
  customer: {
    type: String,
    ref: 'User', // Reference to the User model
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered'],
    default: 'pending'
  },

  address:{
    type:String,
  },
  paymentMethod:{
    type:String,
  }
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
