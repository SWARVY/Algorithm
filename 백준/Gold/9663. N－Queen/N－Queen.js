const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().split(" ");
const size = Number(input);
const position = new Array(size);
let count = 0;

function promise(position, curr) {
  for (let i = 0; i < curr; i++) {
    if (
      position[i] === position[curr] ||
      Math.abs(curr - i) === Math.abs(position[curr] - position[i])
    )
      return false;
  }
  return true;
}

function queen(curr) {
  if (curr === size) {
    count += 1;
    return;
  }
  for (let i = 0; i < size; i++) {
    position[curr] = i;
    if (promise(position, curr)) queen(curr + 1);
  }
}

function app() {
  queen(0);
}

app();
console.log(count);
