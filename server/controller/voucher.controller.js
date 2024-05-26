const Voucher = require("./../models/voucher.model");

const createVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.create(req.body);
    res.status(200).json(voucher);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern) {
      if (error.keyPattern.code) {
        res.status(409).json({ message: "Code already exists" });
      }
    } else {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  }
};

const listVoucher = async (req, res) => {
    const firebaseUid = req.params.sellerId; // Assuming sellerId is passed in the request params

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


module.exports = {
  createVoucher,
  listVoucher,
};
