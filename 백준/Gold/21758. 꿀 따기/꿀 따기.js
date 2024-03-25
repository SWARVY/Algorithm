const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = +input.shift();
const values = input[0].split(' ').map(Number);

const solve = () => {
  const sum = Array.from({ length: n + 1 }, () => 0);
  let max = -1;

  for (let i = 1; i <= n; i += 1) {
    sum[i] = sum[i - 1] + values[i - 1];
  }

  // 벌, 벌, 꿀통
  for (let i = 2; i < n; i += 1) {
    max = Math.max(max, sum[n] - values[0] - values[i - 1] + sum[n] - sum[i]);
  }

  // 꿀통, 벌, 벌
  for (let i = 2; i < n; i += 1) {
    max = Math.max(max, sum[i - 1] + sum[n] - values[i - 1] - values[n - 1]);
  }

  // 벌, 꿀통, 벌
  for (let i = 2; i < n; i += 1) {
    max = Math.max(
      max,
      sum[i] - values[i - 2] + sum[n] - sum[i - 1] - values[n - 1]
    );
  }

  console.log(max);
};

solve();
