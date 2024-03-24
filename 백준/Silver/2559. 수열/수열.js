const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, k] = input.shift().split(' ');
const numbers = input[0].split(' ').map(Number);

const solve = () => {
  const curr = {
    start: 0,
    end: k - 1,
  };
  let sum = 0;
  let max = -1;

  for (let i = 0; i <= curr.end; i += 1) {
    sum += numbers[i];
  }

  max = sum;

  while (curr.start !== n - k) {
    curr.start += 1;
    curr.end += 1;
    sum += numbers[curr.end] - numbers[curr.start - 1];
    max = Math.max(max, sum);
  }

  console.log(max);
};

solve();
