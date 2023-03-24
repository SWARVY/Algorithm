const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().split(" ").map(Number);
const array = new Array(input[1]);

function promise(curr) {
  const subArray = array.slice(0, curr + 1);
  const set = new Set(subArray);
  return set.size === subArray.length;
}

function combination(curr) {
  if (curr === input[1]) {
    const temp = array.slice();
    if (array.toString() === temp.sort().toString())
      console.log(array.join(" "));
    return;
  }
  for (let i = 0; i < input[0]; i++) {
    array[curr] = i + 1;
    if (promise(curr)) combination(curr + 1);
  }
}

combination(0);
