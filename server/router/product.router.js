const express = require("express");
const router = express.Router();

const {createProduct,getProductseller,getsingleProduct,updateProduct}=require('.//../controller/product.controller')

router.post('/createProduct',createProduct)
router.get('/getProductseller/:id',getProductseller)
router.get('/getsingleProduct/:id',getsingleProduct)
router.put('/updateProduct/:id',updateProduct);

module.exports = router;