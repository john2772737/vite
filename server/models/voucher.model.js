const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import Seller from './seller.model'

// Define the Voucher Schema
const voucherSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: Number,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },

  seller: {
    type:String,
    ref: 'Seller'
  },
});

// Create a model for the Voucher schema
const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
