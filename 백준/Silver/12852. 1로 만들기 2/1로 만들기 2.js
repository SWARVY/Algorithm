const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const target = Number(input[0]);

const solve = () => {
  const dp = Array.from({ length: target + 1 }, () => -1);
  const save = Array.from({ length: target + 1 }, () => -1);
  const answer = [];

  dp[1] = 0;

  for (let i = 2; i <= target; i += 1) {
    dp[i] = dp[i - 1] + 1;
    save[i] = i - 1;

    if (i % 2 === 0 && dp[i / 2] + 1 < dp[i]) {
      dp[i] = dp[i / 2] + 1;
      save[i] = i / 2;
    }

    if (i % 3 === 0 && dp[i / 3] + 1 < dp[i]) {
      dp[i] = dp[i / 3] + 1;
      save[i] = i / 3;
    }
  }

  console.log(dp[target]);

  let temp = target;

  while (true) {
    answer.push(temp);

    if (temp === 1) {
      break;
    }

    temp = save[temp];
  }

  console.log(answer.join(" "));
};

solve();
