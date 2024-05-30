const express = require('express')
const router= express.Router()

const {createOrder}= require('./../controller/orders.controller')

router.post('/createOrder',createOrder)

module.exports = router;