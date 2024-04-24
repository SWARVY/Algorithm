const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const n = +input.shift();
  const m = +input.shift();
  const union = Array.from({ length: n + 1 }, (_, idx) => idx);

  const solve = () => {
    for (let i = 0; i < n; i += 1) {
      const connected = input.shift().split(' ').map(Number);

      for (let j = 0; j < n; j += 1) {
        if (connected[j] === 1) {
          join(i + 1, j + 1);
        }
      }
    }

    const route = input.shift().split(' ').map(Number);

    // console.log(union);

    for (let i = 0; i < m; i += 1) {
      if (union[route[i]] !== union[route[0]]) {
        console.log('NO');
        return;
      }
    }

    console.log('YES');
  };

  const find = (v) => {
    if (union[v] === v) {
      return v;
    }

    return (union[v] = find(union[v]));
  };

  const join = (a, b) => {
    const [unionA, unionB] = [find(a), find(b)];

    unionA > unionB ? (union[unionA] = unionB) : (union[unionB] = unionA);
  };

  solve();
  process.exit();
});
