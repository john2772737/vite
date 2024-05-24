const express = require("express");
const router = express.Router();
const {
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

} = require("../controller/seller.controller");

router.post("/createphone", createphone);
router.get("/listseller", listseller);
router.get("/checkSeller/:id", isApproved);
router.get("/findPhoneNumber/:phoneNumber", findPhoneNumber);
router.get("/checkEmail/:email", checkEmail);
router.get("/checkShopname/:shopname", checkShopname);
router.put("/updateSeller/:id", updateSeller);
router.post("/verified/:phoneNumber", verified);
router.post("/createProduct", createProduct);
router.get("/:firebaseuid/getProduct", getProduct);

module.exports = router;
