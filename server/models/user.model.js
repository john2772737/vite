const mongoose = require('mongoose');

const userSchema= mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    username: {
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
    voucher: String,
})