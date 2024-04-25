const Seller = require("../models/seller.model");

const createseller = async (req, res) => {
  try {
    const seller = await Seller.create(req.body);
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listseller = async (req, res) => {
  try {
    const seller = await Seller.find({approved:false});
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteseller = async (req, res) => {};

module.exports = { createseller,listseller};
