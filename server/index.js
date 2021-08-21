const express = require("express");
require("dotenv").config();
const Router = require("./routes/index");
const fs = require("fs");

let store;

fs.readFile("./models/stores.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  store = data;
});

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/", Router);

app.get("/", (req, res) => {
  //   console.log(store);
  res.status(200).send("서버가 실행중입니다.");
});

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 실행중입니다`);
});

module.exports.store = store;
