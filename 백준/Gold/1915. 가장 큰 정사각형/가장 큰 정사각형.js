const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const str = "4 4\n0000\n0000\n0000\n0000";
// const input = str.split("\n");
const [height, width] = input.shift().split(" ").map(Number);
const board = [];
let max = 0;

function start() {
  for (let i = 0; i < height; i++) board.push(input[i].split("").map(Number));
  calculate();
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) max = board[i][j] > max ? board[i][j] : max;
  }
  console.log(max * max);
}

function calculate() {
  for (let i = 1; i < height; i++) {
    for (let j = 1; j < width; j++) {
      if (board[i][j]) board[i][j] += min(i, j);
    }
  }
}

function min(y, x) {
  return Math.min(board[y - 1][x], board[y][x - 1], board[y - 1][x - 1]);
}

start();
