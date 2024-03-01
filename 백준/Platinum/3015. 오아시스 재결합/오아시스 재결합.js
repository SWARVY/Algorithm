const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const str = "7\n2\n4\n1\n2\n2\n5\n1";
// const input = str.split("\n");
input.shift();
const line = input.map(Number);
const stack = [];
let cnt = 0;

line.forEach((height) => {
  let dupl = 1;

  while (stack.length && stack[stack.length - 1].height <= height) {
    cnt += stack[stack.length - 1].dupl;
    if (stack[stack.length - 1].height === height) {
      dupl = stack[stack.length - 1].dupl + 1;
    } else dupl = 1;
    stack.pop();
  }
  if (stack.length) cnt += 1;
  stack.push({ height, dupl });
});
console.log(cnt);
