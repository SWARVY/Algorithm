const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const queryAmount = Number(input.shift());
const queries = input.map((str) => str.split(" ").map(Number));

const solve = () => {
  const answer = [];
  let sum = 0;
  let xor = 0;

  for (let i = 0; i < queryAmount; i += 1) {
    const command = queries[i][0];

    if (command === 1) {
      sum += queries[i][1];
      xor ^= queries[i][1];
    } else if (command === 2) {
      sum -= queries[i][1];
      xor ^= queries[i][1];
    } else if (command === 3) {
      answer.push(sum);
    } else {
      answer.push(xor);
    }
  }

  console.log(answer.join("\n"));
};

solve();
