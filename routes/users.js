const express = require("express");
const router = express.Router();
const {
  join,
  login,
  passwordResetRequest,
  passwordReset,
} = require("../controller/userController");

router.use(express.json());

router.post("/signup", join);

router.post("/login", login);

router.post("/reset", passwordResetRequest);

router.put("/reset", passwordReset);

module.exports = router;
