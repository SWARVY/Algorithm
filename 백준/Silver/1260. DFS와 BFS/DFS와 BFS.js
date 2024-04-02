const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m, v] = input.shift().split(' ').map(Number);
const graph = Array.from({ length: n + 1 }, () => []);

const dfsVisited = Array.from({ length: n + 1 }, () => false);
const dfsResult = [];
const bfsVisited = Array.from({ length: n + 1 }, () => false);
const bfsResult = [];

const solve = () => {
  input.forEach((str) => {
    const [from, to] = str.split(' ').map(Number);

    graph[from].push(to);
    graph[to].push(from);
  });

  for (let i = 1; i <= n; i += 1) {
    graph[i].sort((a, b) => a - b);
  }

  dfs(v);
  bfs(v);

  console.log(dfsResult.join(' '));
  console.log(bfsResult.join(' '));
};

const dfs = (start) => {
  dfsVisited[start] = true;
  dfsResult.push(start);

  for (const vertex of graph[start]) {
    if (!dfsVisited[vertex]) {
      dfs(vertex);
    }
  }
};

const bfs = (start) => {
  const queue = [start];

  bfsResult.push(start);
  bfsVisited[start] = true;

  while (queue.length) {
    const node = queue.shift();

    for (const vertex of graph[node]) {
      if (!bfsVisited[vertex]) {
        bfsResult.push(vertex);
        queue.push(vertex);
        bfsVisited[vertex] = true;
      }
    }
  }
};

solve();
