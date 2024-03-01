const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [kind, sum] = input.shift().split(" ").map(Number);

function coin() {
  let count = 0;
  let curr = sum;

  for (let i = input.length - 1; i >= 0; i--) {
    if (Number(input[i]) <= curr) {
      count += Math.floor(curr / input[i]);
      curr %= input[i];
    }
  }
  console.log(count);
}

coin();
