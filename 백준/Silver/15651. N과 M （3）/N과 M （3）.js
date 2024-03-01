const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().split(" ").map(Number);
const array = new Array(input[1]);
const result = [];

function combination(curr) {
  if (curr === input[1]) {
    result.push(array.join(" "));
    return;
  }
  for (let i = 0; i < input[0]; i++) {
    array[curr] = i + 1;
    combination(curr + 1);
  }
}

combination(0);
console.log(result.join("\n"));
