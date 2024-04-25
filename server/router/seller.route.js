const express = require("express");
const router = express.Router();
const {createseller, listseller}= require('../controller/seller.controller');

router.post('/createseller',createseller)
router.get('/listseller',listseller)

module.exports = router;