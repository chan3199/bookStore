const express = require("express");
const router = express.Router();
const {
  allBooks,
  bookDetail,
  booksByCategory,
} = require("../controller/bookController");

router.use(express.json());

router.get("/", allBooks);
router.get("/:id", bookDetail);

module.exports = router;
