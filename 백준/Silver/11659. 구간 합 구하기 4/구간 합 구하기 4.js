const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const numbers = input.shift().split(" ").map(Number);
const target = input.map((str) => str.split(" ").map(Number));

const solve = () => {
  const dp = Array.from({ length: n + 1 }, () => 0);
  const answer = [];

  dp[1] = numbers[0];

  for (let i = 2; i <= n; i += 1) {
    dp[i] = dp[i - 1] + numbers[i - 1];
  }

  for (let i = 0; i < m; i += 1) {
    const [start, end] = target[i];

    answer.push(dp[end] - dp[start - 1]);
  }

  console.log(answer.join("\n"));
};

solve();
