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
    const product = await Product.findOneAndUpdate(
      { _id: id }, 
      req.body, 
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
}

const listProductQuery = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    const products = await Product.find({ category: query });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error fetching products:", error);
  }
};

const allproducts = async (req, res) => {
  try {
      const products = await Product.find();
      res.status(200).json(products);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

const getSuggestions = async (req, res) => {
  try {
      const partialQuery = req.query.q; // Assuming 'q' is the parameter for the partial search query
      // Use partialQuery to find matching suggestions
      const suggestions = await Product.find({ name: { $regex: new RegExp(`^${partialQuery}`, 'i') } }).limit(5); // Example: Searching product names
      res.status(200).json(suggestions);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};





module.exports={
    createProduct,
    getProductseller,
    getsingleProduct,
    updateProduct,
    deleteProduct,
    listProductQuery,
    allproducts,
    getSuggestions,
    
}