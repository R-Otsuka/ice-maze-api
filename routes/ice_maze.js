const express = require('express')
const app = express();
const cors = require('cors');
const router = express.Router();

const _ = require('lodash');
const { Floor } = require('../lib/service/floor');

// 一旦固定値で設定
// TODO: ユーザーが任意の値に変更できるようにする。
const FLOOR_LENGTH = 20;
const STONE_COUNT = 12;

app.get('/map', (req, res) => {
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

app.post('/map/evolve', (req, res) => {
  while (score > current.score) {
    // mapの遺伝的合成と評価、scoreの更新を繰り返す。
    // この生成過程をできれば画面表示したい。
  }
});

module.exports = app;

