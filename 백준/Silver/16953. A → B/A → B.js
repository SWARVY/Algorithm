const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [a, b] = input[0].split(" ").map(Number);

const solve = () => {
  const queue = [];

  queue.push({ val: a, depth: 1 });

  while (queue.length) {
    const { val, depth } = queue.shift();

    if (val === b) {
      console.log(depth);
      return;
    }

    const [val1, val2] = [val * 2, Number(val.toString() + "1")];

    if (val1 <= b) {
      queue.push({ val: val1, depth: depth + 1 });
    }

    if (val2 <= b) {
      queue.push({ val: val2, depth: depth + 1 });
    }
  }

  console.log(-1);
};

solve();
