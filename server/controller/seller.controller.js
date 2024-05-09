const Seller = require("../models/seller.model");

const createphone = async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const seller = await Seller.create({phoneNumber});
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }

};
const findPhoneNumber = async (req, res) => {
  const { phoneNumber } = req.params;
  console.log(phoneNumber);
  try {
    const seller = await Seller.findOne({ phoneNumber });


    if (seller) {
   
      // Send both the boolean value and the seller object
      res.status(200).json({ found: true, seller });
    } else {
      // Send only the boolean value
      res.status(200).json({ found: false });
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

const isApproved= async (req,res)=>{

  try{
    const {id}= req.params;
    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product found" });
  } catch (error) {
    console.log(error);
  }
}

const updateSeller = async (req,res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findByIdAndUpdate(id, req.body);
    if (!seller) {
    res.status(404).json({ message: "Product not found" });
    }
   res.status(200).json({ message: "Product found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createphone, listseller, isApproved, findPhoneNumber,updateSeller};
