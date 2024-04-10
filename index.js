const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors");
const database_connection = require("./mongodb/database_connect");

const authRouter = require("./auth/authRouter");
const diaryRouter = require("./diary/diaryRouter");

const errorMiddlewere = require("./middlewere/error");

PORT = process.env.PORT || 3000;

dotenv.config();
database_connection();

app.use(cors({ origin: process.env.CLIENT_DOMAIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/diaries", diaryRouter);

app.use(errorMiddlewere);

app.listen(PORT, () => {
  console.log(`online now ${PORT}`);
});
