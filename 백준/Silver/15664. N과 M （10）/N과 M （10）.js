const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const answer = new Set();
const [n, m] = input.shift().split(" ").map(Number);
const numbers = input[0]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const solve = () => {
  const visited = Array.from({ length: n }, () => false);

  dfs([], visited);

  console.log(Array.from(answer).join("\n"));
};

const dfs = (list, visited) => {
  if (list.length === m) {
    answer.add(list.join(" "));
    return;
  }

  numbers.forEach((el, idx) => {
    if (visited[idx]) {
      return;
    }

    visited[idx] = true;
    list.push(el);

    if (check(list)) {
      dfs(list, visited);
    }

    list.pop();
    visited[idx] = false;
  });
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
