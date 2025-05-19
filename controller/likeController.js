const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const addLike = (req, res) => {
  res.json("좋아요 추가");
};

const removeLike = (req, res) => {
  res.json("좋아요 삭제제");
};

module.exports = { addLike, removeLike };
