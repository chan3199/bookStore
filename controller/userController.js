const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const join = (req, res) => {
  const { email, password } = req.body;

  const sql = "INSERT INTO users (email,password) VALUES(?,?)";
  const values = [email, password];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.CREATED).json(results);
  });
};
const login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    const loginUser = results[0];
    if (loginUser && loginUser.password == password) {
      const token = jwt.sign(
        {
          email: loginUser.email,
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: "30m",
          issuer: "Lee",
        }
      );
      res.cookie("token", token, {
        httpOnly: true,
      });
      console.log(token);
      return res.status(StatusCodes.OK).json(results);
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end(); // 401 : unauthoried ( 비인증 상태 ) 403 : Forbidden ( 접근 권한 없음 )
    }
  });
};
const passwordResetRequest = (req, res) => {
  const { email, password } = req.body;

  const sql = "INSERT INTO users (email,password) VALUES(?,?)";
  const values = [email, password];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.CREATED).json(results);
  });
};
const passwordReset = (req, res) => {
  const { email, password } = req.body;

  const sql = "INSERT INTO users (email,password) VALUES(?,?)";
  const values = [email, password];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.CREATED).json(results);
  });
};

module.exports = { join, login, passwordResetRequest, passwordReset };
