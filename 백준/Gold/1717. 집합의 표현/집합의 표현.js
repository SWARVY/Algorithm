const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
let union;

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [n, m] = input.shift().split(' ').map(Number);

  union = Array.from({ length: n + 1 }, (_, i) => i);
  solve(n, m);
});

const solve = (n, m) => {
  const answer = [];

  for (let i = 0; i < m; i += 1) {
    const [prefix, a, b] = input[i].split(' ').map(Number);

    if (prefix === 0) {
      join(a, b);
    } else {
      find(a) === find(b) ? answer.push('YES') : answer.push('NO');
    }
  }

  console.log(answer.join('\n'));
};

const find = (v) => {
  if (v === union[v]) {
    return v;
  }

  union[v] = find(union[v]);

  return union[v];
};

const join = (a, b) => {
  const [unionA, unionB] = [find(a), find(b)];

  unionA > unionB ? (union[unionA] = unionB) : (union[unionB] = unionA);
};
