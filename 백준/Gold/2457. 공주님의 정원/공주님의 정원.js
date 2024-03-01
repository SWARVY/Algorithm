const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];
const flower = [];
let answer = 0;

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  parse(input);
  process.exit();
});

function parse() {
  const amount = Number(input.shift());

  input.forEach((str) => {
    flower.push(str.split(' ').map(Number));
  });
  
  solve(amount);
}

function solve(amount) {
  const visit = Array.from({ length: amount }, () => false);
  const startDate = {
    month: 3,
    day: 1,
  };
  const endDate = {
    month: 0,
    day: 0,
  };
  let index = -1;

  while (true) {
    for (let i = 0; i < amount; i += 1) {
      const [startMonth, startDay, endMonth, endDay] = flower[i];

      if (visit[i]) {
        continue ;
      }
      
      if (startMonth < startDate.month || startMonth === startDate.month && startDay <= startDate.day) {
        if (endMonth > endDate.month || endMonth === endDate.month && endDay > endDate.day) {
          index = i;
          endDate.month = endMonth;
          endDate.day = endDay;
        }
      }
    }

    if (index === -1) {
      console.log(0);
      break;
    }
    
    startDate.month = flower[index][2];
    startDate.day = flower[index][3];
    
    if (startDate.month === 12) {
      console.log(answer + 1);
      break;
    }

    visit[index] = true;
    answer += 1;
    endDate.month = 0;
    endDate.day = 0;
    index = -1;
  }
}
