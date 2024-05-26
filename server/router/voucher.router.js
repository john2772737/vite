const express = require("express");
const router = express.Router();
const {
  createVoucher,
  listVoucher,
} = require("./../controller/voucher.controller");

router.post("/createVoucher", createVoucher);
router.get("/listVoucher", listVoucher);

module.exports = router;
