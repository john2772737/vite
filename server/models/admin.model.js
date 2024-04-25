const mongoose = require("mongoose");

// Define the schema
const userSchema = new mongoose.Schema({
  name: {
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

});

// Create the User model using the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
