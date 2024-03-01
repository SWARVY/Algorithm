const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const [n, d, k, c] = input.shift().split(" ").map(Number);

  solve(n, d, k, c);
  process.exit();
});

const solve = (n, d, k, c) => {
  const map = input.map(Number);
  const concattedMap = n !== k ? [...map, ...map.slice(0, k - 1)] : map;
  const visited = new Array(d + 1).fill(0);
  let max = 1;
  let count = 1;

  visited[c] += 1;

  for (let i = 0; i < k; i += 1) {
    if (visited[concattedMap[i]] === 0) {
      count += 1;
    }
    visited[concattedMap[i]] += 1;
  }

  for (let i = 1; i < n; i += 1) {
    const start = concattedMap[i - 1];
    const end = concattedMap[i + k - 1];

    visited[start] -= 1;

    if (visited[start] === 0) {
      count -= 1;
    }

    if (visited[end] === 0) {
      count += 1;
    }

    visited[end] += 1;
    max = Math.max(max, count);
  }

  console.log(max);
};
