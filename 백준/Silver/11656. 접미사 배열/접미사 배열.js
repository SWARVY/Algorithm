const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const str = input[0];

const solve = () => {
  const suffixes = [];

  for (let i = 0; i < str.length; i += 1) {
    suffixes.push(str.substring(i));
  }

  console.log(suffixes.sort().join('\n'));
};

solve();
