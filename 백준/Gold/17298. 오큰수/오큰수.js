const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const str = "4\n9 5 4 8";
// const input = str.split("\n");
const arr = input[1].split(" ").map(Number);
const stack = [];
const result = new Array(arr.length).fill(-1);

arr.forEach((value, idx) => {
  if (!stack.length) {
    stack.push({ value, idx });
    return;
  }

  while (stack.length) {
    if (stack[stack.length - 1].value < value) {
      result[stack[stack.length - 1].idx] = value;
      stack.pop();
    } else {
      break;
    }
  }
  stack.push({ value, idx });
});

console.log(result.join(" "));
