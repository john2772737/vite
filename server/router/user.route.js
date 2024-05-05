const express = require("express");
const router = express.Router();

const {
  createUser,
  isuid,
  createUserProvider,
  getEmail,
  sendVerification
} = require("../controller/user.controller");

router.post('/createUser', createUser);
router.get('/checkUid/:uid', isuid);

router.post('/createUserProvider', createUserProvider);
router.get('/checkEmail/:email', getEmail);
router.post('/sendVerification/:email',sendVerification)

module.exports = router;
