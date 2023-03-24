const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().split(" ").map(Number);
const array = [];
let result = "";

function combination(curr, start) {
  if (curr === input[1]) {
    result += array.join(" ") + "\n";
    return;
  }
  for (let i = start; i < input[0]; i++) {
    array.push(i + 1);
    combination(curr + 1, i);
    array.pop();
  }
}

combination(0, 0);
console.log(result);
