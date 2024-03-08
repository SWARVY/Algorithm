const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const testCase = Number(input.shift());
const street = input.map((str) => str.split(" ").map(Number));

const solve = () => {
  const dp = Array.from({ length: testCase + 1 }, () =>
    Array.from({ length: 4 }, () => -1)
  );

  [dp[1][1], dp[1][2], dp[1][3]] = [street[0][0], street[0][1], street[0][2]];

  for (let i = 2; i <= testCase; i += 1) {
    [dp[i][1], dp[i][2], dp[i][3]] = [
      Math.min(dp[i - 1][2], dp[i - 1][3]) + street[i - 1][0],
      Math.min(dp[i - 1][1], dp[i - 1][3]) + street[i - 1][1],
      Math.min(dp[i - 1][1], dp[i - 1][2]) + street[i - 1][2],
    ];
  }

  console.log(Math.min(dp[testCase][1], dp[testCase][2], dp[testCase][3]));
};

solve();
