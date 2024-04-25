const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = +input.shift();
const numbers = input[0]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

const solve = () => {
  const curr = {
    start: 0,
    end: n - 1,
  };
  const answer = {
    info: [null, null],
    value: Infinity,
  };

  while (curr.start !== curr.end) {
    if (answer.value > Math.abs(numbers[curr.start] + numbers[curr.end])) {
      [answer.info[0], answer.info[1]] = [
        numbers[curr.start],
        numbers[curr.end],
      ];
      answer.value = Math.abs(numbers[curr.start] + numbers[curr.end]);
    }

    if (numbers[curr.start] + numbers[curr.end] < 0) {
      curr.start += 1;
    } else {
      curr.end -= 1;
    }
  }

  console.log(answer.info.join(' '));
};

solve();
