const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const attempt = Number(input.shift());
let max = 0;

function app() {
  for (let i = 0; i < attempt; i++) {
    const stat = new Array(11);
    const info = [];

    for (let i = 0; i < 11; i++) stat[i] = { value: 0, index: -1 };
    for (let i = 0; i < 11; i++)
      info.push(input.shift().split(" ").map(Number));
    select(info, stat, 0);
    console.log(max);
    max = 0;
  }
}

function select(info, stat, player) {
  if (player === 11) {
    const currSum = stat.reduce((sum, curr) => {
      return (sum += curr.value);
    }, 0);

    if (currSum > max) max = currSum;
    return;
  }

  for (let i = 0; i < 11; i++) {
    if (promise(info[player][i], stat, player, i)) {
      stat[player].value = info[player][i];
      stat[player].index = i;
      select(info, stat, player + 1);
    }
  }
}

function promise(info, stat, player, index) {
  if (!info) return false;
  for (let i = 0; i < player; i++) if (stat[i].index === index) return false;
  return true;
}

app();
