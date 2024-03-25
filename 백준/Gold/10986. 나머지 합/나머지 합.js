const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, m] = input.shift().split(' ').map(Number);
const numbers = input[0].split(' ').map(Number);

const solve = () => {
  const sum = Array.from({ length: n + 1 }, () => 0);
  const cnt = Array.from({ length: m }, () => 0);
  let answer = 0;

  for (let i = 1; i <= n; i += 1) {
    sum[i] = sum[i - 1] + numbers[i - 1];
    cnt[sum[i] % m] += 1;
  }

  for (let i = 0; i < m; i += 1) {
    answer += (cnt[i] * (cnt[i] - 1)) / 2;
  }

  console.log(answer + cnt[0]);
};

solve();
