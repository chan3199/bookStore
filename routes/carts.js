const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  removeCartItems,
} = require("../controller/cartController");

router.use(express.json());

router.post("/", addToCart);

router.get("/", getCartItems);

router.delete("/:id", removeCartItems);

router.get("/", (req, res) => {
  res.json("선택한 장바구니 상품 조회");
});

module.exports = router;
