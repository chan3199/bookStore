const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const addToCart = (req, res) => {
  const { bookId, quantity, userId } = req.body;
  const sql =
    "INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)";
  const values = [bookId, quantity, userId];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};
const getCartItems = (req, res) => {
  const { userId, selected } = req.body;
  const sql = `SELECT cartItems.id, book_id, title, summary, quantity, price 
                FROM cartItems LEFT JOIN books 
                ON cartItems.book_id = books.id
                WHERE user_id = ? AND cartItems.id IN (?)`;
  const values = [userId, selected];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};

const removeCartItems = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM cartItems WHERE id = ?";
  conn.query(sql, id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};

module.exports = { addToCart, getCartItems, removeCartItems };
