const express = require("express");
const router = express.Router();
const {createphone, listseller,isApproved,findPhoneNumber,phoneNumberSubmitted}= require('../controller/seller.controller');

router.post('/createphone',createphone)
router.get('/listseller',listseller)
router.get('/checkSeller/:id',isApproved)
router.get('/findPhoneNumber/:phoneNumber',findPhoneNumber)

module.exports = router;