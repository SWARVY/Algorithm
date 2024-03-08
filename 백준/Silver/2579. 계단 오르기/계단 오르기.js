const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const stairAmount = Number(input.shift());
const stairs = input.map(Number);

const solve = () => {
  const dp = Array.from({ length: stairAmount + 2 }, () =>
    Array.from({ length: 3 }, () => -1)
  );

  [dp[1][1], dp[1][2]] = [stairs[0], 0];
  [dp[2][1], dp[2][2]] = [stairs[1], stairs[1] + stairs[0]];

  for (let i = 3; i <= stairAmount; i += 1) {
    [dp[i][1], dp[i][2]] = [
      Math.max(dp[i - 2][1], dp[i - 2][2]) + stairs[i - 1],
      dp[i - 1][1] + stairs[i - 1],
    ];
  }

  console.log(Math.max(dp[stairAmount][1], dp[stairAmount][2]));
};

solve();
