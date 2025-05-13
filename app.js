const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config();

app.listen(process.env.PORT);

const userRouter = require("./routes/users");
const bookRouter = require("./routes/users");
const likeRouter = require("./routes/users");
const cartRouter = require("./routes/users");
const orderRouter = require("./routes/users");

app.use("users/", userRouter);
app.use("carts/", cartRouter);
app.use("books/", bookRouter);
app.use("orders/", orderRouter);
app.use("likes/", likeRouter);
