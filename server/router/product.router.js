const express = require("express");
const router = express.Router();

const {createProduct,getProductseller,getsingleProduct}=require('.//../controller/product.controller')

router.post('/createProduct',createProduct)
router.get('/getProductseller/:id',getProductseller)
router.get('/getsingleProduct/:id',getsingleProduct)

module.exports = router;