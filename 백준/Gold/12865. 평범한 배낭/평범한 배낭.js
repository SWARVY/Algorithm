const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, k] = input.shift().split(" ").map(Number);
const items = input.map((el) => el.split(" ").map(Number));

const solve = () => {
  const dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: k + 1 }, () => 0)
  );

  for (let i = 1; i <= n; i += 1) {
    const weight = items[i - 1][0];
    const value = items[i - 1][1];

    for (let j = 1; j <= k; j += 1) {
      if (j >= weight) {
        dp[i][j] = Math.max(dp[i - 1][j], value + dp[i - 1][j - weight]);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  console.log(dp[n][k]);
};

solve();
