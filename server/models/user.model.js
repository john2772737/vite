const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true, // Ensure UID is unique
  },
  name: String,
  email: {
    type: String,
    unique: true, // Ensure email is unique (optional, depending on your application logic)
  },
  username: {
    type: String,
    
  },
  photo: String,
  password: String, // Consider using a more secure method for storing passwords, like hashing
  birthday: Date,
  phoneNumber: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
