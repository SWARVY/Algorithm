const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const playerAmount = +input.shift();
const playerNumbers = input[0].split(' ').map(Number);

// 가장 쉬운풀이는 O(N^2) for문 2번으로 푸는 풀이겠지만, 여기서는 그렇게 풀 수 없다.
// O(N) or O(NlogN)정도는 되어야한다

const solve = () => {
  const maxValue = Math.max(...playerNumbers);
  const arr = Array.from({ length: maxValue + 1 }, () => 0);
  const answer = new Map();
  const temp = [];

  for (let i = 0; i < playerAmount; i += 1) {
    arr[playerNumbers[i]] = i + 1;
    answer.set(playerNumbers[i], 0);
  }

  for (let i = 0; i < playerAmount; i += 1) {
    for (let j = playerNumbers[i] * 2; j <= maxValue; j += playerNumbers[i]) {
      if (arr[j] !== 0) {
        const cursor = answer.get(playerNumbers[i]);
        const target = answer.get(j);

        answer.set(playerNumbers[i], cursor + 1);
        answer.set(j, target - 1);
      }
    }
  }

  answer.forEach((val) => {
    temp.push(val);
  });

  console.log(temp.join(' '));
};

solve();
