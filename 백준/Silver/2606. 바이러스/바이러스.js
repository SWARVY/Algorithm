const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const computerNumber = input.shift();
const connectedComputer = input.shift();

function solve() {
  const networks = input.map((arr) => arr.split(" ")).sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
  const res = bfs('1', networks);

  console.log(res.size - 1);
}

function bfs(start, networks) {
  const queue = [];
  const visited = new Set();

  queue.push({ computer: start, depth: 0 });
  visited.add(start);
  while (queue.length) {
    const node = queue.shift();

    networks.forEach((network) => {
      if (node.computer === network[0] && !visited.has(network[1])) {
        queue.push({ computer: network[1], depth: node.depth + 1 });
      } else if (node.computer === network[1] && !visited.has(network[0])) {
        queue.push({ computer: network[0], depth: node.depth + 1 });
      }
      visited.add(node.computer);
    });
  }

  return visited;
}

solve();