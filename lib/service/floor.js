const _ = require('lodash');
const DXY = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const DIRECTION = { left: { x: -1, y: 0 }, right: { x: 1, y: 0 }, up: { x: 0, y: -1 }, down: { x: 0, y: 1 } };

const calculateNewPosition = (x, y, dx, dy, map) => {
  console.log(x, y, dx, dy, typeof x, typeof y, typeof dx, typeof dy, 'calculateNewPosition');
  console.log(y + dy, x + dx);
  // 22はfloorのサイズ。TODO可変にする
  if (x + dx < 0 || x + dx >= 22 || y + dy < 0 || y + dy >= 22 || map[y + dy][x + dx] !== 1) {
      return { x, y };
    }
    return calculateNewPosition(x + dx, y + dy, dx, dy, map);
  }


const calculateScore = (map, start, goal) => {
  // 状態の保存
  const statusMap = {};
  const dfs = (x, y) => {
    statusMap[y] = statusMap[y] || {};
    if (statusMap[y][x]) {
      return;
    }
    statusMap[y][x] = true;
    for (let i = 0; i < DXY.length; i++) {
      const dx = DXY[i][0];
      const dy = DXY[i][1];
      const newPosition = calculateNewPosition(x, y, dx, dy, map);
      dfs(newPosition.x, newPosition.y);
    }
  }
  dfs(start.x, start.y);
  return _.reduce(statusMap, (sum, map, y) => {
    return sum + _.reduce(map, (_sum, val, x) => {
      return _sum + val;
    }, 0);
  }, 0);
}

exports.Floor = {
  calculateScore,
}