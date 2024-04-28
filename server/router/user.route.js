const express = require("express");
const router = express.Router();

const { createUser, isuid, createUserProvider,  } = require("../controller/user.controller");

router.post("/createUser", createUser);
router.get('/checkUid/:uid',isuid)

router.post("/createUserProvider", createUserProvider);



module.exports = router;
