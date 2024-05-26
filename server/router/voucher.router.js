const express = require("express");
const router = express.Router();
const {
  createVoucher,
  listVoucher,
  deleteVoucher,
  getsingleVoucher,
} = require("./../controller/voucher.controller");

router.post("/createVoucher", createVoucher);
router.get("/listVoucher/:firebaseUid", listVoucher);

router.delete("/deleteVoucher/:id", deleteVoucher);

router.get("/getsingleVoucher/:id", getsingleVoucher);

module.exports = router;
