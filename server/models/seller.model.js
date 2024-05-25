const mongoose = require('mongoose');
const Product = require('./product.model');

const sellerSchema = new mongoose.Schema({
    firebaseuid:{
        type:String,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    address:{
        type: String,
      
    },
    shopname: {
        type: String,
    
    },
    password: {
        type: String,
    },
    email: {
        type: String,
     
    },
    birthday: Date,
    phoneNumber: {
        type: String,
        unique: true
    },
    picture: {
        type: String,
    },
    idPicture: {
        type: String,
    },
    approved: {
        type: String,
        enum: ['true', 'false', 'unapproved'],
        default: 'false'
    },
    
    submit: {
        type: Boolean,
        default: false // Default value set to false
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

module.exports = mongoose.model('Seller', sellerSchema);
