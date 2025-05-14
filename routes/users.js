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

router.post("/reset", (req, res) => {
  res.json("비밀번호 초기화 요청");
});

router.put("/reset", (req, res) => {
  res.json("비밀번호 초기화");
});

module.exports = router;
