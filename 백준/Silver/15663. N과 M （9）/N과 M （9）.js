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

  for (let i = 0; i < n; i += 1) {
    if (visited[i]) {
      continue;
    }

    visited[i] = true;
    list.push(numbers[i]);
    dfs(list, visited);
    list.pop();
    visited[i] = false;
  }
};

solve();
