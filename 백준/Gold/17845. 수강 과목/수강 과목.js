const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, k] = input.shift().split(" ").map(Number);
const items = input.map((el) => el.split(" ").map(Number));

const solve = () => {
  const dp = Array.from({ length: k + 1 }, () =>
    Array.from({ length: n + 1 }, () => 0)
  );

  for (let i = 1; i <= k; i += 1) {
    const [value, cost] = items[i - 1];

    for (let j = 1; j <= n; j += 1) {
      if (j >= cost) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - cost] + value);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  console.log(dp[k][n]);
};

solve();
