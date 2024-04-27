const mongoose = require('mongoose');

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
        type:String,
        unique:true
        
    },
    
    Picture: {
    type: Buffer,
    
    },

    idPicture: {
        type: Buffer,
     
    },

    approved: Boolean,
    submit:Boolean
})

module.exports = mongoose.model('Seller', sellerSchema);

