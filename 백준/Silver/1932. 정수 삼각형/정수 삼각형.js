const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const size = Number(input.shift());
const numbers = input.map((el) => el.split(" ").map(Number));

const solve = () => {
  const dp = Array.from({ length: size }, (_, idx) =>
    Array.from({ length: idx + 1 }, () => 0)
  );
  let max = numbers[0][0];

  dp[0][0] = numbers[0][0];

  for (let i = 0; i < size - 1; i += 1) {
    for (let j = 0; j <= i; j += 1) {
      dp[i + 1][j] = Math.max(dp[i][j] + numbers[i + 1][j], dp[i + 1][j]);
      dp[i + 1][j + 1] = Math.max(
        dp[i][j] + numbers[i + 1][j + 1],
        dp[i + 1][j + 1]
      );

      max = Math.max(max, dp[i + 1][j], dp[i + 1][j + 1]);
    }
  }

  console.log(max);
};

solve();
