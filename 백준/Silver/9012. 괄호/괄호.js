const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const amount = +input.shift();

const solve = () => {
  const answer = [];

  for (let i = 0; i < amount; i += 1) {
    const str = input.shift().split('');
    const curr = [];
    let flag = false;

    for (let j = 0; j < str.length; j += 1) {
      if (str[j] === '(') {
        curr.push(str[j]);
      } else {
        if (curr.length) {
          curr.pop();
        } else {
          flag = true;
          break;
        }
      }
    }

    if (curr.length || flag) {
      answer.push('NO');
    } else {
      answer.push('YES');
    }
  }

  console.log(answer.join('\n'));
};

solve();
