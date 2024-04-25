const Admin =require('../models/admin.model');

const createadmin = async (req, res) => {
  try {
      const admin = await Admin.create(req.body);
      res.status(200).json(admin);
  } catch (error) {
      if (error.code === 11000 && error.keyPattern) {
          if (error.keyPattern.email) {
              res.status(409).json({ message: "Email already exists" });
          } else if (error.keyPattern.username) {
              res.status(409).json({ message: "Username already exists" });
          } else {
              res.status(409).json({ message: "Duplicate key error" });
          }
      } else {
          res.status(500).json({ message: error.message });
      }
  }
};


  const listAdmin =  async (req, res) => {
    try {
      const admin = await Admin.find({});
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ message: error.message });
      
    }
  };


  const deleteAdmin = async (req, res) => {
    try {
      const { id } = req.params;

      const admin = await Admin.findByIdAndDelete(id);
      if (!admin) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {
    createadmin,
    listAdmin,
    deleteAdmin,
  };