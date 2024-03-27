const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const numberAmount = +input.shift();
const numbers = input
  .shift()
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);
const targetNumberAmount = +input.shift();
const targetNumbers = input.shift().split(' ').map(Number);

const solve = () => {
  const answer = [];

  for (let i = 0; i < targetNumberAmount; i += 1) {
    const a = higherIdx(targetNumbers[i]);
    const b = lowerIdx(targetNumbers[i]);

    answer.push(higherIdx(targetNumbers[i]) - lowerIdx(targetNumbers[i]));
  }

  console.log(answer.join(' '));
};

const lowerIdx = (targetNumber) => {
  const curr = {
    start: 0,
    end: numberAmount,
  };

  while (curr.start < curr.end) {
    const mid = parseInt((curr.start + curr.end) / 2);

    if (numbers[mid] >= targetNumber) {
      curr.end = mid;
    } else {
      curr.start = mid + 1;
    }
  }

  return curr.start;
};

const higherIdx = (targetNumber) => {
  const curr = {
    start: 0,
    end: numberAmount,
  };

  while (curr.start < curr.end) {
    const mid = parseInt((curr.start + curr.end) / 2);

    if (numbers[mid] > targetNumber) {
      curr.end = mid;
    } else {
      curr.start = mid + 1;
    }
  }

  return curr.start;
};

solve();
