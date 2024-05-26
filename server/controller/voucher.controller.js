const Voucher = require("./../models/voucher.model");
const Seller = require('../models/seller.model')

const createVoucher = async (req, res) => {
    const { firebaseUid, ...productData } = req.body;

    if (!firebaseUid) {
        return res.status(400).json({ error: 'Seller UID is required' });
      }

      const seller = await Seller.findOne({ firebaseuid: firebaseUid });
      if (!seller) {
        return res.status(404).json({ error: 'Seller not found' });
      }
  
      const voucher = new Voucher({
        seller: firebaseUid,
        ...productData
      });
  
      await voucher.save();
      seller.vouchers.push(voucher._id);
      await seller.save();
  
      res.status(201).json(voucher);
    try {
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
}


const listVoucher = async (req, res) => {
    const {firebaseUid} = req.params// Assuming sellerId is passed in the request params

    try {
        // Assuming Voucher model has a field named 'sellerId'
        const vouchers = await Voucher.find({ seller: firebaseUid });

        if (vouchers.length === 0) {
            return res.status(404).json({ message: "No vouchers found for this seller." });
        }

        res.status(200).json(vouchers);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};


const deleteVoucher = async(req,res)=>{
    const{id}= req.params
    try {
        const voucher = await Voucher.findByIdAndDelete(id);
        if(!voucher){
            return res.status(404).json({ message: "Voucher not found" });
        }

        res.status(200).json(voucher);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
}

const getsingleVoucher = async (req,res)=>{
    const{id}= req.params
    try {
        const voucher = await Voucher.findById(id);
        if(!voucher){
            return res.status(404).json({ message: "Voucher not found" });
        }
        res.status(200).json(voucher);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    
    }
}

module.exports = {
  createVoucher,
  listVoucher,
  deleteVoucher,
  getsingleVoucher,
};
