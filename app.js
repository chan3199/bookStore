const dotenv = require("dotenv");
const express = require("express");
const userRouter = require("./routes/users");
const app = express();

dotenv.config();

app.listen(process.env.PORT);

app.use("/", userRouter);
