const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const size = Number(input.shift());
const lines = [];

function app() {
  for (let i = 0; i < size; i++) lines.push(input[i].split(" ").map(Number));
  lines.sort((a, b) => a[0] - b[0]);
  console.log(draw());
}

function draw() {
  const pos = { start: null, end: null };
  let sum = 0;

  [pos.start, pos.end] = lines[0];
  for (let i = 1; i < size; i++) {
    const [x, y] = lines[i];

    if (x > pos.end || y < pos.start) {
      sum += pos.end - pos.start;
      pos.start = x;
      pos.end = y;
      continue;
    }
    if (x < pos.start) pos.start = x;
    if (y > pos.end) pos.end = y;
  }
  sum += pos.end - pos.start;

  return sum;
}

app();
