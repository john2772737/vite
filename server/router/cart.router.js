
const express = require("express");
const router=express.Router()

const {createCart,listCart}= require('../controller/cart.controller');

router.post('/createCart',createCart)

router.get('/listCart/:id',listCart)

module.exports = router;