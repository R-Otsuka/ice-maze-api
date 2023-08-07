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

// 一旦不変にする
const FLOOR_LENGTH = 20;
const STONE_COUNT = 12;

app.get('/floor', (req, res) => {
  // 可変にする
  const start = { x: 1, y: 0 };
  const goal = { x: 20, y: 21 };
  const score = 0;
  const map = _.map(new Array(FLOOR_LENGTH + 2), (val, y) => {
    if (y === 0 || y === FLOOR_LENGTH + 1) {
      return _.map(new Array(FLOOR_LENGTH + 2), (_val, x) => {
        if ((start.x === x && start.y === y) || (goal.x === x && goal.y === y)) {
          return 1;
        }
        return 0;
      });
    }
    return _.map(new Array(FLOOR_LENGTH + 2), (_val, x) => {
      if ((start.x === x && start.y === y) || (goal.x === x && goal.y === y)) {
        return 1;
      }
      return Math.round(Math.random()) + 1;
    });
  });
  res.json({ map, start, goal, stone: STONE_COUNT, length: FLOOR_LENGTH, score });
});

app.use(router);