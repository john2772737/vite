const mongoose = require('mongoose');
import Customer from './user.model'
import Product from './product.model'
const orderSchema = new mongoose.Schema({
  customer: {
    type: String,
    ref: 'Customer', // Assuming you have a Customer model
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Assuming you have a Product model
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
