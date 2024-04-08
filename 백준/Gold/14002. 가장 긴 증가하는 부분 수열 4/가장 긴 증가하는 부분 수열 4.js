const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const size = +input.shift();
const numbers = input.shift().split(' ').map(Number);

const solve = () => {
  const dp = Array.from({ length: size }, () => 1);
  const max = {
    count: 1,
    idx: 0,
  };
  const answer = [];

  for (let i = 1; i < size; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (numbers[i] > numbers[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }

    if (max.count < dp[i]) {
      max.count = dp[i];
      max.idx = i;
    }
  }

  const temp = {
    count: max.count,
    idx: max.idx,
  };

  answer.push(numbers[temp.idx]);
  temp.count -= 1;
  temp.idx -= 1;

  while (temp.idx > -1) {
    if (temp.count === dp[temp.idx]) {
      answer.push(numbers[temp.idx]);
      temp.count -= 1;
    }
    temp.idx -= 1;
  }

  console.log(max.count);
  console.log(answer.reverse().join(' '));
};

solve();
