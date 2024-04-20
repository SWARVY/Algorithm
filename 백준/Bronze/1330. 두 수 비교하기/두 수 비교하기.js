const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [a, b] = input.shift().split(' ').map(Number);

if (a > b) console.log('>');
else if (a < b) console.log('<');
else console.log('==')