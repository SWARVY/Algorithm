const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const number = Number(input.shift());

const solve = () => {
  const dp = Array.from({ length: number + 1 }, () => -1);

  [dp[1], dp[2]] = [1, 2];

  for (let i = 3; i <= number; i += 1) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
  }

  console.log(dp[number]);
};

solve();
