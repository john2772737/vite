const Seller = require("../models/seller.model");

const createphone = async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const seller = await Seller.create({ phoneNumber });
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
const findPhoneNumber = async (req, res) => {
  const { phoneNumber } = req.params;
  console.log(phoneNumber);
  try {
    const seller = await Seller.findOne({ phoneNumber });

    if (seller) {
      // Send both the boolean value and the seller object
      return res.status(200).json({ found: true, seller });
    } else {
      // Send only the boolean value
      return res.status(200).json({ found: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listseller = async (req, res) => {
  try {
    const seller = await Seller.find({ approved: false });
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteseller = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findByIdAndDelete(id);
    if (!seller) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

const isApproved = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product found" });
  } catch (error) {
    console.log(error);
  }
};

const updateSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findByIdAndUpdate(id, req.body);
<<<<<<< HEAD
    if (seller) {
    return res.status(200).json({ message: "Registration Successful. Please Log In " });
    }
    return res.status(200).json({ message: "Registration Failed" });
=======
    if (!seller) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product found" });
>>>>>>> 1d550d7fa52ec72333e6e414621a6343696959f0
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const checkEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(200).json({ found: false, message: "Email not found" });
    }
    return res
      .status(200)
      .json({ found: true, message: "Email is Already Registered." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const checkShopname = async (req, res) => {
  try {
    const { shopname } = req.params;
    const seller = await Seller.findOne({ shopname });
    if (seller) {
      return res
        .status(200)
        .json({ found: true, message: "Shopname is Already Registered." });
    }
    return res.status(200).json({ found: false, message: "Seller found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createphone,
  listseller,
  isApproved,
  findPhoneNumber,
  updateSeller,
  checkEmail,
  checkShopname,
};
