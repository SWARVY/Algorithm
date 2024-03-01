const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const answer = new Set();

const solve = () => {
  const [n, m] = input.shift().split(" ").map(Number);
  const numbers = input
    .shift()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  dfs([], numbers, n, m);

  console.log(Array.from(answer).join("\n"));
};

const dfs = (list, numbers, n, m) => {
  if (list.length === m) {
    answer.add(list.join(" "));
    return;
  }

  for (let i = 0; i < n; i += 1) {
    list.push(numbers[i]);

    if (check(list)) {
      dfs(list, numbers, n, m);
    }

    list.pop();
  }
};

const check = (list) => {
  for (let i = 0; i < list.length - 1; i += 1) {
    if (list[i] > list[i + 1]) {
      return false;
    }
  }

  return true;
};

solve();
