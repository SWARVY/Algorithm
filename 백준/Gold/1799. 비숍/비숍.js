const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const size = +input.shift();
const board = input.map((row) => row.split(' ').map(Number));
const whiteBoard = Array.from({ length: size }, () => []);
const blackBoard = Array.from({ length: size }, () => []);

let whiteMax = 0;
let blackMax = 0;

const TYPE = {
  white: 0,
  black: 1,
};

const solve = () => {
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      if (board[i][j] === 1) {
        if (isWhite(i, j)) {
          whiteBoard[i].push([i, j]);
        } else {
          blackBoard[i].push([i, j]);
        }
      }
    }
  }

  bishop([], whiteBoard, [0, 0], 0);
  bishop([], blackBoard, [0, 0], 1);

  console.log(whiteMax + blackMax);
};

// 흰색, 검은색 칸을 나누어서 생각하자
const bishop = (list, targetBoard, curr, type) => {
  const [row, col] = curr;

  if (type === TYPE.white) {
    whiteMax = Math.max(list.length, whiteMax);
  } else {
    blackMax = Math.max(list.length, blackMax);
  }

  for (let i = row; i < size; i += 1) {
    for (let j = col; j < targetBoard[i].length; j += 1) {
      list.push(targetBoard[i][j]);

      if (check(list)) {
        if (j === targetBoard[i].length - 1) {
          bishop(list, targetBoard, [row + 1, 0], type);
        } else {
          bishop(list, targetBoard, [row, col + 1], type);
        }
      }

      list.pop();
    }
  }
};

// 대각선으로 겹치는지 확인해야함, 해당 좌표 기준 왼쪽대각 + 오른쪽대각
const check = (list) => {
  const lastValue = list[list.length - 1];

  for (let i = 0; i < list.length - 1; i += 1) {
    if (
      Math.abs(lastValue[0] - list[i][0]) ===
      Math.abs(lastValue[1] - list[i][1])
    ) {
      return false;
    }
  }

  return true;
};

const isWhite = (row, col) =>
  (row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1);

solve();
