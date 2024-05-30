const mongoose = require('mongoose');
const User = require('./user.model'); // Assuming this is the correct path to your User model
const Product = require('./product.model'); // Assuming this is the correct path to your Product model

const orderSchema = new mongoose.Schema({
  customer: {
    type: String, // Correct type for a reference to another model
    ref: 'User', // Reference to the User model
    required: true
  },
  contactnumber: {
    type: String, // Add the type for contact number
    required: true,
    validate: {
      validator: function(v) {
        return /\d{11}/.test(v); // Example validation: 10 digit number
      },
      message: props => `${props.value} is not a valid phone number!`
    }
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
  address: {
    type: String,
    required: true // Assuming address is required for every order
  },
  paymentMethod: {
    type: String,
    required: true // Assuming payment method is required for every order
  },

  shippingProvider:{
    type: String,
    required: true // Assuming shipping provider is required for every order
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
