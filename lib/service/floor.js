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


const calculateScore = (map, start, goal) => {
  // 状態の保存
  const statusMap = {};
  let minSteps = 10 ** 8;
  const dfs = (x, y, steps) => {
    statusMap[y] = statusMap[y] || {};
    if (statusMap[y][x]) {
      return;
    }
    statusMap[y][x] = true;
    if (goal.x === x && goal.y === y && minSteps > steps) {
      minSteps = steps;
    }
    for (let i = 0; i < DXY.length; i++) {
      const dx = DXY[i][0];
      const dy = DXY[i][1];
      const newPosition = calculateNewPosition(x, y, dx, dy, map);
      dfs(newPosition.x, newPosition.y, steps + 1);
    }
  }
  dfs(start.x, start.y, 0);
  const statusCount = _.reduce(statusMap, (sum, map, y) => {
    return sum + _.reduce(map, (_sum, val, x) => {
      return _sum + val;
    }, 0);
  }, 0);
  if (minSteps === 10 ** 8) {
    return { min_steps: 0, status_count: 0 };
  }
  return { min_steps: minSteps, status_count: statusCount };
}

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

exports.Floor = {
  calculateScore,
  createRandomMap,
}