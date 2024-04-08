const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const str1 = input.shift().split('');
const str2 = input.shift().split('');

const solve = () => {
  const dp = Array.from({ length: str1.length + 1 }, () =>
    Array.from({ length: str2.length + 1 }, () => 0)
  );
  const answer = [];
  const temp = {
    y: str1.length,
    x: str2.length,
  };

  for (let i = 1; i <= str1.length; i += 1) {
    for (let j = 1; j <= str2.length; j += 1) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  while (temp.y !== 0 && temp.x !== 0) {
    const [up, left] = [dp[temp.y - 1][temp.x], dp[temp.y][temp.x - 1]];

    if (dp[temp.y][temp.x] !== up && dp[temp.y][temp.x] !== left) {
      answer.push(str2[temp.x - 1]);
      temp.y = temp.y - 1;
      temp.x = temp.x - 1;
    } else if (dp[temp.y][temp.x] === up) {
      temp.y = temp.y - 1;
    } else if (dp[temp.y][temp.x] === left) {
      temp.x = temp.x - 1;
    }
  }

  console.log(answer.length);

  if (answer.length) {
    console.log(answer.reverse().join(''));
  }
};

solve();
