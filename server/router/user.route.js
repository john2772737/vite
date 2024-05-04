const express = require("express");
const router = express.Router();

const {
  createUser,
  isuid,
  createUserProvider,
  getEmail,
} = require("../controller/user.controller");

router.post('/createUser', createUser);
router.get('/checkUid/:uid', isuid);

router.post('/createUserProvider', createUserProvider);
router.get('/checkEmail/:email', getEmail);

module.exports = router;
