const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  res.json("카테고리 조회");
});

module.exports = router;
