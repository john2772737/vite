const Product = require("../models/product.model");
const Seller = require('../models/seller.model')

const createProduct = async (req, res) => {
    const { firebaseUid, ...productData } = req.body;

    if (!firebaseUid) {
        return res.status(400).json({ error: 'Seller UID is required' });
      }

      const seller = await Seller.findOne({ firebaseuid: firebaseUid });
      if (!seller) {
        return res.status(404).json({ error: 'Seller not found' });
      }
  
      const product = new Product({
        seller: firebaseUid,
        ...productData
      });
  
      await product.save();
      seller.products.push(product._id);
      await seller.save();
  
      res.status(201).json(product);
    try {
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
}

const getProductseller= async(req,res)=>{

    const{id}= req.params
    try {
        
        const product = await Product.findById(id);
        const firebaseuid = product.seller

        const seller= await Seller.find({firebaseuid:firebaseuid})
        res.status(200).json(seller)
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const getsingleProduct = async(req,res)=>{
    const{id}= req.params
    try {
        
        const product = await Product.findById(id);
        res.status(200).json(product)
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}


const updateProduct = async (req, res) => {
  const { id } = req.params;
  

  try {
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports={
    createProduct,
    getProductseller,
    getsingleProduct,
    updateProduct
    
}