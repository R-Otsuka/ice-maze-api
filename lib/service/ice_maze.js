const _ = require('lodash');
const DXY = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const DIRECTION = { left: { x: -1, y: 0 }, right: { x: 1, y: 0 }, up: { x: 0, y: -1 }, down: { x: 0, y: 1 } };

const calculateNewPosition = (x, y, dx, dy, map) => {
  // 22はfloorのサイズ。TODO可変にする
  if (x + dx < 0 || x + dx >= 22 || y + dy < 0 || y + dy >= 22 || map[y + dy][x + dx] !== 1) {
      return { x, y };
    }
    return calculateNewPosition(x + dx, y + dy, dx, dy, map);
  }

// 最短経路は別で考える必要ありそう。。status=trueと被った時のルートを塞いでしまうから
// 幅優先にして最短経路も求める
// キューがなくなるまでやれば、全パターンと最短経路がわかる
// キューから出して初めて行った場所は移動回数nをdistに記録する


const bfs = (start, goal, map) => {
  const queue = [{ ...start, count: 0, history: [{ x: start.x, y: start.y }] }];
  const dist = {};
  while (queue.length > 0) {
    const t = queue.shift();
    const { x, y, count, history } = t;
    for (let i = 0; i < DXY.length; i++) {
      const dx = DXY[i][0];
      const dy = DXY[i][1];
      const next = calculateNewPosition(x, y, dx, dy, map);
      dist[next.y] = dist[next.y] || {};
      if (dist[next.y][next.x]) {
        // 登録済みならスルー
        continue;
      }
      const status = { count: count + 1, history: [...history, { x: next.x, y: next.y }] };
      queue.push({ x: next.x, y: next.y, ...status});
      dist[next.y][next.x] = status;
    }
  }
  return dist;
}

// mapの難易度と最短ルートの計算
// countってpathのlengthと重複してる...
const calculateScore = (map, start, goal) => {
  // 状態の保存
  const distMap = bfs(start, goal, map);
  const statusCount = _.reduce(distMap, (sum, map, y) => {
    return sum + _.reduce(map, (_sum, val, x) => {
      return _sum + val.count;
    }, 0);
  }, 0);
  const minSteps = _.get(distMap, [goal.y, goal.x, 'count']);
  if (!minSteps) {
    return { min_steps: 0, status_count: 0 };
  }
  const path = _.get(distMap, [goal.y, goal.x, 'history']);
  return { min_steps: minSteps, status_count: statusCount, path };
};

const createRandomMap = (start, goal, length, stoneCount) => {
  const randomMap = _.map(new Array(length + 2), (val, y) => {
    if (y === 0 || y === length + 1) {
      return _.map(new Array(length + 2), (_val, x) => {
        if ((start.x === x && start.y === y) || (goal.x === x && goal.y === y)) {
          return 1;
        }
        return 0;
      });
    }
    return _.map(new Array(length + 2), (_val, x) => {
      if ((start.x === x && start.y === y) || (goal.x === x && goal.y === y)) {
        return 1;
      }
      if (x === 0 || x === length + 1) {
        return 0;
      }
      return Math.round(Math.random() - 0.4) + 1;
    });
  });
  return randomMap;
};

exports.IceMaze = {
  calculateScore,
  createRandomMap,
}
