const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  solution(input);
  process.exit();
});

const solution = function (input) {
  const [n, m] = input.shift().split(' ').map(Number);
  const entry = Array.from({ length: n + 1 }, () => 0);
  const relations = Array.from({ length: n + 1 }, () => []);
  const answer = [];
  const queue = [];

  for (row of input) {
    const [a, b] = row.split(' ').map(Number);
    entry[b]++;
    relations[a].push(b);
  }

  // entry가 0인 노드를 찾는다.
  for (let i = 1; i <= n; i++) {
    if (entry[i] === 0) {
      queue.push(i);
      entry[i] = -1;
    }
  }

  while (queue.length > 0) {
    const node = queue.shift();
    answer.push(node);

    for (student of relations[node]) {
      entry[student]--;

      if (entry[student] === 0) {
        queue.push(student);
        entry[student] = -1;
      }
    }
  }
  console.log(answer.join(' '));
};
