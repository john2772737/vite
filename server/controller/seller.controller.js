const Seller = require("../models/seller.model");

const createphone = async (req, res) => {
  try {
    const seller = await Seller.create(req.body);
    res.status(200).json(seller);
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

module.exports = { createphone, listseller, isApproved};
