const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);

const solve = () => {
  const groupA = new Set(input.slice(0, n));
  const groupB = new Set(input.slice(n, -1));
  const answer = [];

  groupA.forEach((val) => {
    if (groupB.has(val)) {
      answer.push(val);
    }
  });

  console.log(answer.length + "\n" + answer.sort().join("\n"));
};

solve();
