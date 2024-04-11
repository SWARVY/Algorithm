const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input.shift());
const street = input.map((str) => str.split(' ').map(Number));

const solve = () => {
  const dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: 4 }, () => 0)
  );
  let answer = Infinity;

  for (let i = 1; i <= 3; i += 1) {
    [dp[1][1], dp[1][2], dp[1][3]] = [
      i === 1 ? street[0][i - 1] : Infinity,
      i === 2 ? street[0][i - 1] : Infinity,
      i === 3 ? street[0][i - 1] : Infinity,
    ];

    for (let j = 2; j < n; j += 1) {
      [dp[j][1], dp[j][2], dp[j][3]] = [
        Math.min(dp[j - 1][2], dp[j - 1][3]) + street[j - 1][0],
        Math.min(dp[j - 1][1], dp[j - 1][3]) + street[j - 1][1],
        Math.min(dp[j - 1][1], dp[j - 1][2]) + street[j - 1][2],
      ];
    }

    [dp[n][1], dp[n][2], dp[n][3]] = [
      Math.min(dp[n - 1][2], dp[n - 1][3]) + street[n - 1][0],
      Math.min(dp[n - 1][1], dp[n - 1][3]) + street[n - 1][1],
      Math.min(dp[n - 1][1], dp[n - 1][2]) + street[n - 1][2],
    ];

    dp[n].forEach((val, idx) => {
      if (idx !== 0 && idx !== i) {
        answer = Math.min(answer, val);
      }
    });
  }

  console.log(answer);
};

solve();
