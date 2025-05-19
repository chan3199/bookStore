const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const allBooks = (req, res) => {
  const { categoryId, news, limit, currentPage } = req.query;
  const offset = limit * (currentPage - 1);
  let sql =
    "SELECT *, (SELECT count(*) FROM Bookstore.likes where liked_book_id = books.id) AS likes FROM books";
  let values = [];

  if (categoryId && news) {
    sql +=
      " WHERE category_id=? AND pub_date BETWEEN date_sub(NOW(), INTERVAL 2 YEAR) AND NOW()";
    values = [categoryId];
  } else if (categoryId) {
    sql += " WHERE category_id=?";
    values = [categoryId];
  } else if (news) {
    sql += " WHERE pub_date BETWEEN date_sub(NOW(), INTERVAL 2 YEAR) AND NOW()";
  }
  sql += " LIMIT ? OFFSET ?";
  values.push(parseInt(limit), offset);
  doSqlQuery(sql, values, res);
};

const bookDetail = (req, res) => {
  const { userId } = req.body;
  const bookId = req.params.id;
  const sql = `
  SELECT *, 
(SELECT count(*) FROM Bookstore.likes where liked_book_id = books.id) AS likes,
(SELECT EXISTS (SELECT * FROM likes WHERE user_id = ? AND liked_book_id = ?)) AS liked 
 FROM books LEFT JOIN 
  category ON books.category_id = category.category_id WHERE books.id=?`;
  const values = [userId, bookId, bookId];
  console.log(req.params.id);
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results.length) {
      return res.status(StatusCodes.OK).json(results);
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }
  });
};

const doSqlQuery = (sql, values, res) => {
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results.length) {
      return res.status(StatusCodes.OK).json(results);
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }
  });
};

module.exports = { allBooks, bookDetail };
