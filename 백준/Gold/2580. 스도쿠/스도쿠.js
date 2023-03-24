const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const str =
//   "0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0";
// const input = str.split("\n");
const arr = [];
const zero = [];
const result = [];
const len = input.length;

function app() {
  for (let i = 0; i < input.length; i++)
    arr.push(input[i].split(" ").map(Number));
  findZero();
  sudoku(0);
}

function findZero() {
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (!arr[i][j]) zero.push([i, j]);
    }
  }
}

function sudoku(cnt) {
  if (cnt === zero.length) {
    for (let i = 0; i < len; i++) result.push(arr[i].join(" "));
    console.log(result.join("\n"));
    process.exit(0);
  }

  let zero_y = zero[cnt][0];
  let zero_x = zero[cnt][1];

  for (let i = 1; i <= len; i++) {
    if (promise(zero_y, zero_x, i)) {
      arr[zero_y][zero_x] = i;
      sudoku(cnt + 1);
      arr[zero_y][zero_x] = 0;
    }
  }
}

function promise(y, x, value) {
  let xaxis = Math.floor(x / 3) * 3;
  let yaxis = Math.floor(y / 3) * 3;

  for (let i = 0; i < len; i++)
    if (value === arr[y][i] && x !== i) return false;
  for (let i = 0; i < len; i++)
    if (value === arr[i][x] && y !== i) return false;
  for (let i = yaxis; i < yaxis + 3; i++) {
    for (let j = xaxis; j < xaxis + 3; j++)
      if (arr[i][j] === value) return false;
  }
  return true;
}

app();
