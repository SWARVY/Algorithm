const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input.shift().split(' ').map(Number);
const nodes = input.map((str) => str.split(' ').map(Number));

const solve = () => {
  const graph = Array.from({ length: n + 1 }, () => []);
  const visited = Array.from({ length: n + 1 }, () => false);
  let answer = 0;

  nodes.forEach(([from, to]) => {
    graph[from].push(to);
    graph[to].push(from);
  });

  for (let i = 1; i <= n; i += 1) {
    if (!visited[i]) {
      bfs(i, graph, visited);
      answer += 1;
    }
  }

  console.log(answer);
};

const bfs = (start, graph, visited) => {
  const queue = [start];

  while (queue.length) {
    const node = queue.shift();

    for (const vertex of graph[node]) {
      if (visited[vertex]) {
        continue;
      }
      queue.push(vertex);
      visited[vertex] = true;
    }
  }
};

solve();
