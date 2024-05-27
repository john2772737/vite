const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProductseller,
  getsingleProduct,
  updateProduct,
  deleteProduct,
  listProductQuery,
  allproducts,
  getSuggestions,
} = require(".//../controller/product.controller");

router.post("/createProduct", createProduct);
router.get("/getProductseller/:id", getProductseller);
router.get("/getsingleProduct/:id", getsingleProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

router.get("/listProductQuery", listProductQuery);

router.get("/allproducts", allproducts);

router.get("/getSuggestions", getSuggestions);

module.exports = router;
