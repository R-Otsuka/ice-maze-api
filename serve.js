const express = require('express')
const app = express();
const cors = require('cors');
const router = express.Router();
const port = 3001
const _ = require('lodash');
const { Floor } = require('./lib/service/floor');

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
  let map = [];
  let score = 0;
  let minSteps = 0;
  let goalPath = [];
  while (score === 0) {
    map = Floor.createRandomMap(start, goal, FLOOR_LENGTH, STONE_COUNT);
    const { min_steps, status_count, path } = Floor.calculateScore(map, start, goal);
    score = min_steps * status_count;
    minSteps = min_steps;
    goalPath = path;
  }
  res.json({ map, start, goal, stone: STONE_COUNT, length: FLOOR_LENGTH, score, min_steps: minSteps, path: goalPath });
});

app.put('/floor', (req, res) => {
  // 可変にする
  const current = {
    // const start = { x: 1, y: 0 };
    // const goal = { x: 20, y: 21 };
    // let map = [];
    // let score = 0;
    // let minSteps = 0;
    // let goalPath = [];
  }
  let score = 0;
  while (score > current.score) {
    // mapの遺伝的合成と評価、scoreの更新を繰り返す。
    // この生成過程をできれば画面表示したい。
  }
  res.json({ map, start, goal, stone: STONE_COUNT, length: FLOOR_LENGTH, score, min_steps: minSteps, path: goalPath });
});

app.use(router);
