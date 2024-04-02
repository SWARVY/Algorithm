const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, k] = input[0].split(' ').map(Number);

const solve = () => {
  const queue = [];
  const visited = Array.from({ length: 100001 }, () => Infinity);

  queue.push({ val: n, depth: 0 });
  visited[n] = true;

  while (queue.length) {
    const { val, depth } = queue.shift();

    if (val === k) {
      console.log(depth);
      return;
    }

    if (visited[val * 2] > depth) {
      queue.unshift({ val: val * 2, depth });
      visited[val * 2] = depth;
    }

    if (visited[val + 1] > depth + 1) {
      queue.push({ val: val + 1, depth: depth + 1 });
      visited[val + 1] = depth + 1;
    }

    if (visited[val - 1] > depth + 1) {
      queue.push({ val: val - 1, depth: depth + 1 });
      visited[val - 1] = depth + 1;
    }
  }
};

solve();
