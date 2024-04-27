const express = require("express");
const router = express.Router();
const {createphone, listseller,isApproved}= require('../controller/seller.controller');

router.post('/createphone',createphone)
router.get('/listseller',listseller)
router.get('/checkSeller/:id',isApproved)

module.exports = router;