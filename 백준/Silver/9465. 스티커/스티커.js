const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const testCase = Number(input.shift());

const solve = () => {
  for (let i = 0; i < testCase; i += 1) {
    const n = Number(input.shift());
    const numbers = [];
    const dp = Array.from({ length: 2 }, () =>
      Array.from({ length: n + 1 }, () => 0)
    );

    for (let i = 0; i < 2; i += 1) {
      numbers.push(input.shift().split(" ").map(Number));
      numbers[i].unshift(0);
    }

    [dp[0][1], dp[1][1]] = [numbers[0][1], numbers[1][1]];

    for (let i = 2; i <= n; i += 1) {
      dp[0][i] = Math.max(dp[1][i - 1], dp[1][i - 2]) + numbers[0][i];
      dp[1][i] = Math.max(dp[0][i - 1], dp[0][i - 2]) + numbers[1][i];
    }

    console.log(Math.max(...dp[0], ...dp[1]));
  }
};

solve();
