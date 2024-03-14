const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = Number(input.shift());
const schedule = input.map((str) => str.split(" ").map(Number));

const solve = () => {
  const answer = [];

  schedule.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  });

  schedule.forEach((time) => {
    if (!answer.length) {
      answer.push(time);
      return;
    }

    const last = answer[answer.length - 1];

    if (last[1] <= time[0]) {
      answer.push(time);
    }
  });

  console.log(answer.length);
};

solve();
