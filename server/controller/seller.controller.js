const Seller = require("../models/seller.model");
const Product = require("../models/product.model");

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
  const { approved } = req.query; // Get the 'approved' query parameter
  
  let query = {};
  if (approved === 'true') {
    query.approved = "true";
  } else {
    query.approved = "false";
    query.submit= true
    
  }
  
  try {
    const sellers = await Seller.find(query);
    res.status(200).json(sellers);
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
    if (seller) {
    return res.status(200).json({ message: "Registration Successful. Please Log In " });
    }
    return res.status(200).json({ message: "Registration Failed" });
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

const verified = async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    const seller = await Seller.findOne({ phoneNumber });

    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    if (seller.approved === 'true') {
     
      req.session.phoneNumber = seller.phoneNumber;
      req.session.save();
      console.log(req.session)
      return res.json({ message: 'Seller approved and logged in' });
    } else {
      return res.status(401).json({ message: 'Seller not approved' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    // Create the product
    const product = new Product(req.body);
    const savedProduct = await product.save();

    // Associate the product with the seller
    const sellerId = req.body.sellerId;
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    seller.products.push(savedProduct._id);
    await seller.save();

    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getProduct= async(req,res)=>{
  const {firebaseuid}= req.params
  try{
   const seller = await Seller.findOne({firebaseuid:firebaseuid}).populate('products');
 
   res.json(seller.products)
  }catch(error){
    console.log(error)
  }
}


module.exports = {
  createphone,
  listseller,
  isApproved,
  findPhoneNumber,
  updateSeller,
  checkEmail,
  checkShopname,
  verified,
  createProduct,
  getProduct,
};
