const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config();

app.listen(process.env.PORT);

const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const likeRouter = require("./routes/likes");
const cartRouter = require("./routes/carts");
const orderRouter = require("./routes/orders");
const categoryRouter = require("./routes/category");

app.use("/users", userRouter);
app.use("/carts", cartRouter);
app.use("/books", bookRouter);
app.use("/orders", orderRouter);
app.use("/likes", likeRouter);
app.use("/category", categoryRouter);
