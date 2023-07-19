const express = require('express')
const app = express();
const cors = require('cors');
const router = express.Router();
const port = 3001
const _ = require('lodash');

app.use(cors({
  origin: 'http://localhost:8080', //アクセス許可するオリジン
  credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
  optionsSuccessStatus: 200 //レスポンスstatusを200に設定
}));
app.get('/', (req, res) => {
  console.log("hello world");
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/floor', (req, res) => {
  // ここに氷の迷路アルゴリズムを作る。
  const floorLength = 10;
  const map = _.map(new Array(floorLength), (index) => {
    return _.map(new Array(floorLength), (val) => Math.round(Math.random()));
  });
  console.log(map);
  res.json(map);
});

app.use(router);