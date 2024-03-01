const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const size = Number(input.shift());

function solve() {
  const tree = Array.from({ length: size + 1 }, () => []);
  const visited = Array.from({ length: size+ 1 }, () => 0);

  input.forEach(v => {
    const [from, to] = v.split(" ").map(Number);
    tree[from].push(to);
    tree[to].push(from);
  });
  bfs(tree, visited);
  console.log(visited.slice(2, visited.length).join("\n"));
}

function bfs(tree, visited) {
  const queue = [];

  visited[1] = 1;
  for (let next of tree[1]) {
    visited[next] = 1;
    queue.push(next);
  }
  while (queue.length) {
    const node = queue.shift();
    for (let next of tree[node]) {
      if (visited[next]) {
        continue;
      }
      visited[next] = node;
      queue.push(next);
    }
  }
}

solve();