const mongoose = require('mongoose');
const Product = require('./product.model');

const sellerSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    shopname: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    birthday: Date,
    phoneNumber: {
        type: String,
        unique: true
    },
    picture: {
        type: Buffer,
    },
    idPicture: {
        type: Buffer,
    },
    approved: Boolean,
    submit: Boolean,

    
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

module.exports = mongoose.model('Seller', sellerSchema);
