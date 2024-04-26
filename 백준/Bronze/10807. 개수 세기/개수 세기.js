const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = +input.shift();
const numbers = input.shift().split(' ').map(Number);
const target = +input.shift();

console.log(numbers.reduce((acc, cur) => cur === target ? acc + 1 : acc, 0));