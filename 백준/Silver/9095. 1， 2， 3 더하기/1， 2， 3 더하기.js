const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const testCase = Number(input.shift());

const solve = () => {
  const answer = [];

  for (let i = 0; i < testCase; i += 1) {
    const number = Number(input.shift());
    const dp = Array.from({ length: number + 1 }, () => -1);

    dp[1] = 1;
    dp[2] = 2;
    dp[3] = 4;

    for (let j = 4; j <= number; j += 1) {
      dp[j] = dp[j - 1] + dp[j - 2] + dp[j - 3];
    }

    answer.push(dp[number]);
  }

  console.log(answer.join("\n"));
};

solve();
