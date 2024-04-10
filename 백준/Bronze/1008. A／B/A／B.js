const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [a, b] = input.shift().split(' ').map(Number)

console.log(a / b)