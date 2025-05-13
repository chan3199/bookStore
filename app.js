const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config();

app.listen(process.env.PORT);
