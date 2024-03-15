const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = Number(input.shift());
const numbers = input.map((el) => el.split(" ").map(Number));

const solve = () => {
  let answer = 0;

  numbers[0].sort((a, b) => a - b);
  numbers[1].sort((a, b) => b - a);

  for (let i = 0; i < n; i += 1) {
    answer += numbers[0][i] * numbers[1][i];
  }

  console.log(answer);
};

solve();
