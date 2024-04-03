const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, k] = input[0].split(' ').map(Number);

const solve = () => {
  const queue = [];
  const visited = {};
  const path = {};
  const answer = [];
  let target = k;

  queue.push({ val: n, depth: 0 });
  visited[n] = true;

  while (queue.length) {
    const { val, depth } = queue.shift();
    if (val === k) {
      answer.push(k);
      break;
    }

    const nextPositions = [val * 2, val + 1, val - 1];
    for (const nextPos of nextPositions) {
      if (
        nextPos >= 0 &&
        nextPos <= 100000 &&
        (!visited[nextPos] || visited[nextPos] > depth + 1)
      ) {
        queue.push({ val: nextPos, depth: depth + 1 });
        visited[nextPos] = depth + 1;
        path[nextPos] = val;
      }
    }
  }

  while (path[target] !== undefined) {
    answer.push(path[target]);
    target = path[target];
  }

  console.log(answer.length - 1);
  console.log(answer.reverse().join(' '));
};

solve();
