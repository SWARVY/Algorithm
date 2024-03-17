const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, k] = input.shift().split(" ").map(Number);
const items = input.shift().split(" ").map(Number);

const solve = () => {
  const dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: k + 1 }, () => Infinity)
  );

  for (let i = 0; i <= n; i += 1) {
    dp[i][0] = 0;
  }

  for (let i = 1; i <= n; i += 1) {
    const caffeiene = items[i - 1];

    for (let j = 1; j <= k; j += 1) {
      if (j >= caffeiene) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - caffeiene] + 1);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  if (dp[n][k] === Infinity) {
    console.log(-1);
    return;
  }

  console.log(dp[n][k]);
};

solve();
