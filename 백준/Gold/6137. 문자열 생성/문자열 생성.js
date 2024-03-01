const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const str = "10\nA\nA\nB\nC\nA\nA\nD\nE\nA\nA";
// const input = str.split("\n");
const size = input.shift();
let result = "";
let cnt = 0;
let left = 0;
let right = input.length - 1;

for (let i = 0; i < size; i++) {
  if (input[left] < input[right]) {
    result += input[left];
    left += 1;
    cnt += 1;
  } else if (input[left] > input[right]) {
    result += input[right];
    right -= 1;
    cnt += 1;
  } else {
    let temp_left = left + 1;
    let temp_right = right - 1;
    while (input[temp_left] === input[temp_right] && temp_left !== temp_right) {
      temp_left += 1;
      temp_right -= 1;
    }
    if (input[temp_left] <= input[temp_right]) {
      result += input[left];
      left += 1;
      cnt += 1;
    } else {
      result += input[right];
      right -= 1;
      cnt += 1;
    }
  }

  if (cnt % 80 === 0 && result.length && cnt !== 0) result += "\n";
}
console.log(result);
