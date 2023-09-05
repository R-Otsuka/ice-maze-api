const express = require('express')
const app = express();
const cors = require('cors');
const router = express.Router();

const _ = require('lodash');

app.use((req, res, next) => {
  res.status(404).send("<h1>ページが見つかりません</h1>");
});

module.exports = app;

