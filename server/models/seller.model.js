const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    
    
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    shopname: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: [true,"Email already exists"]
    },
    birthday: Date,
    phoneNumber: String,
    
    Picture: {
    type: Buffer,
        required: true
    },

    idPicture: {
        type: Buffer,
        required: true
    },

    approved: Boolean,
})

module.exports = mongoose.model('Seller', sellerSchema);

