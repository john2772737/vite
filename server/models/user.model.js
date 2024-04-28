const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true // Ensure uid is unique
  },
  name: String,
  username: {
    type: String,
    unique: true,
  },

  email: {
    type: String,
    unique: [true, "Email already exists"],
  },

  password: {
    type: String,
    unique: true,
  },
  birthday: Date,
  phoneNumber: String,
  photo: String,


});



const User = mongoose.model("user", userSchema);

module.exports = User;
