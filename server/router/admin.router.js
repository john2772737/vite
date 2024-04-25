const express = require("express");
const router = express.Router();
const {createadmin, listAdmin, deleteAdmin}= require('../controller/admin.controller');

router.post('/createadmin',createadmin)
router.get('/listAdmin',listAdmin)
router.delete("/deleteAdmin/:id",deleteAdmin)


module.exports = router;