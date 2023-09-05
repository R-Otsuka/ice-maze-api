const express = require('express')
const cors = require('cors');
const port = 3001
const _ = require('lodash');


const app = express();
const router = express.Router();


const iceMazeRouter = require('./routes/ice_maze.js');
const errorRouter = require('./routes/error.js');

app.use('/ice_maze', iceMazeRouter);
// 必ずルーティングの最後に記載する。
app.use('/', errorRouter);

app.use(cors({
  origin: 'http://localhost:8080', //アクセス許可するオリジン
  credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
  optionsSuccessStatus: 200 //レスポンスstatusを200に設定
}));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

app.use(router);
