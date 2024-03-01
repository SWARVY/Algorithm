const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  solution(input);
  process.exit();
});

const solution = function (input) {
  const target = Number(input);
  const primes = getPrimeNumbers(target);
  const current = {
    start: 0,
    end: 0,
  };
  let answer = 0;

  while (true) {
    let sum = 0;

    for (let i = current.start; i <= current.end; i += 1) {
      sum += primes[i];
    }
    if (sum === target) {
      answer += 1;
      current.start += 1;
    } else if (sum < target && current.end < primes.length - 1) {
      current.end += 1;
    } else if (sum > target && current.start < primes.length - 1) {
      current.start += 1;
    } else {
      break;
    }
  }
  console.log(answer);
};

const getPrimeNumbers = function (n) {
  const prime = [];
  const numbers = Array.from({length: n + 1}, (v, i) => i);

  for (let i = 2; i <= n; i += 1) {
    if (numbers[i] === 0) {
      continue;
    }
    prime.push(numbers[i]);
    numbers[i] = 0;
    for (let j = i * 2; j <= n; j += i) {
      if (numbers[j] === 0) {
        continue;
      }
      numbers[j] = 0;
    }
  }
  return prime;
}
