const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, m] = input.shift().split(" ").map(Number);
const numbers = input
  .shift()
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const answer = new Set();

// n개중에서 m개를 고르는 경우의 수를 출력
const solve = () => {
  dfs([]);

  console.log(Array.from(answer).join("\n"));
};

const dfs = (list, visited) => {
  if (list.length === m) {
    answer.add(list.join(" "));
    return;
  }

  for (let i = 0; i < n; i += 1) {
    list.push(numbers[i]);
    dfs(list, visited);
    list.pop();
  }
};

solve();
