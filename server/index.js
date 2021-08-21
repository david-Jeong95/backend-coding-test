const express = require('express');
const Router = require('./routes/index')
const fs = require('fs');

const getStores = (req, res, next) => {
    req.db = fs.readFileSync("server/models/sotres.json", "utf-8");
    next();
};

const app = express();

app.use(getStores);
app.use(express.json());

app.use('/', Router);

app.listen(5000, () => {
    console.log('5000번 포트에서 실행중입니다');
});