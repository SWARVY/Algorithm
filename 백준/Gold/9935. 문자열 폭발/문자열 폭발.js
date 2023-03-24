const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const str = "AABCBABCBABCCABCC\nABC";
// const input = str.split("\n");
const target_string = input.shift();
const find_string = input[0];
const stack = [];
let cnt = 0;
let idx = 0;

[...target_string].forEach((value) => {
  stack.push(value);
  if (find_string.indexOf(value) !== -1) {
    if (stack.length >= find_string.length) {
      let end = stack.length;
      for (let i = stack.length - find_string.length; i < end; i++) {
        if (stack[i] === find_string[idx]) {
          cnt += 1;
          idx += 1;
        } else {
          cnt = 0;
          idx = 0;
        }
        if (cnt === find_string.length)
          for (let i = 0; i < find_string.length; i++) stack.pop();
      }
      cnt = 0;
      idx = 0;
    }
  }
});

if (!stack.length) console.log("FRULA");
else console.log(stack.join(""));
