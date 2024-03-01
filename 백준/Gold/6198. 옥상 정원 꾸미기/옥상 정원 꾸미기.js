const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const solve = () => {
  const amount = Number(input.shift());
  const building = input.map(Number);
  const stack = [];
  const answer = [];

  for (let i = 0; i < amount; i += 1) {
    if (!stack.length) {
      stack.push(building[i]);
      continue;
    }

    if (stack[stack.length - 1] <= building[i]) {
      while (stack.length) {
        if (stack[stack.length - 1] > building[i]) {
          break;
        }
        stack.pop();
        answer.push(stack.length);
      }

      stack.push(building[i]);
    } else {
      stack.push(building[i]);
    }

    if (i === amount - 1) {
      while (stack.length) {
        stack.pop();
        answer.push(stack.length);
      }
    }
  }

  console.log(answer.reduce((acc, cur) => acc + cur));
};

solve();
