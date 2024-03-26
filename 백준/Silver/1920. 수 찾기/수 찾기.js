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
    const curr = {
      start: 0,
      end: numbers.length - 1,
    };
    const targetNumber = targetNumbers[i];
    let check = false;

    while (curr.start <= curr.end) {
      const mid = parseInt((curr.start + curr.end) / 2);

      if (targetNumber > numbers[mid]) {
        curr.start = mid + 1;
      } else if (targetNumber < numbers[mid]) {
        curr.end = mid - 1;
      } else {
        check = true;
        break;
      }
    }

    if (check) {
      answer.push(1);
    } else {
      answer.push(0);
    }
  }

  console.log(answer.join('\n'));
};

solve();
