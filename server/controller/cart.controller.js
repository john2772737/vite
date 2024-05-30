const Cart = require("../models/cart.model");

const createCart = async (req, res) => {
  try {
    const newCart = await Cart.create(req.body);
    res.status(200).json(newCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const listCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.find({ user: id }).populate('productId');
    
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};


module.exports = {
  createCart,
  listCart
};
