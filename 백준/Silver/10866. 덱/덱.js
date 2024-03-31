const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = +input.shift();

const solve = () => {
  const deck = [];
  const answer = [];

  for (let i = 0; i < n; i += 1) {
    const command = input[i].split(' ');

    if (command[0] === 'push_back') {
      deck.push(Number(command[1]));
    } else if (command[0] === 'push_front') {
      deck.unshift(Number(command[1]));
    } else if (command[0] === 'front') {
      if (deck.length) {
        answer.push(deck[0]);
      } else {
        answer.push(-1);
      }
    } else if (command[0] === 'back') {
      if (deck.length) {
        answer.push(deck[deck.length - 1]);
      } else {
        answer.push(-1);
      }
    } else if (command[0] === 'pop_front') {
      if (deck.length) {
        answer.push(deck.shift());
      } else {
        answer.push(-1);
      }
    } else if (command[0] === 'pop_back') {
      if (deck.length) {
        answer.push(deck.pop());
      } else {
        answer.push(-1);
      }
    } else if (command[0] === 'size') {
      answer.push(deck.length);
    } else if (command[0] === 'empty') {
      if (deck.length) {
        answer.push(0);
      } else {
        answer.push(1);
      }
    }
  }

  console.log(answer.join('\n'));
};

solve();
