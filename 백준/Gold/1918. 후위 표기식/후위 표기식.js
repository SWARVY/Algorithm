const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("");
// const str = "A*(B+C)";
// const input = str.split("");
const stack = [];
const result = [];
const alphabet = /[A-Z]/;
const priority_sign = /[*|/]/;
const surbodinated_sign = /[+|-]/;

input.forEach((value) => {
  if (alphabet.test(value)) result.push(value);
  else {
    if (value === "(") stack.push(value);
    else if (value === ")") {
      while (stack.length && stack[stack.length - 1] !== "(")
        result.push(stack.pop());
      stack.pop();
    } else if (priority_sign.test(value)) {
      while (stack.length && priority_sign.test(stack[stack.length - 1]))
        result.push(stack.pop());
      stack.push(value);
    } else if (surbodinated_sign.test(value)) {
      while (stack.length && stack[stack.length - 1] !== "(")
        result.push(stack.pop());
      stack.push(value);
    }
  }
});
while (stack.length) result.push(stack.pop());
console.log(result.join(""));
