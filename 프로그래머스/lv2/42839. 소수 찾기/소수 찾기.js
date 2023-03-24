const res = [];
const array = [];

function solution(numbers) {
  for (let i = 1; i <= numbers.length; i++) combination(0, i, numbers);
  return res.length;
}

function combination(curr, len, numbers) {
  // 종료 조건
  if (curr === len) {
    let value = "";

    array.forEach((el) => (value += el.value));
    if (!res.includes(Number(value)) && isPrime(Number(value)))
      res.push(Number(value));
    return;
  }
  // 백트래킹
  for (let i = 0; i < numbers.length; i++) {
    array[curr] = { value: 0, idx: -1 };
    array[curr].value = numbers[i];
    array[curr].idx = i;
    if (promise(array, curr)) combination(curr + 1, len, numbers);
  }
}

function promise(array, curr) {
  if (!curr) return true;
  for (let i = 0; i <= curr - 1; i++)
    if (array[curr].idx === array[i].idx) return false;
  return true;
}

function isPrime(num) {
  if (num === 0 || num === 1) return false;
  if (num === 2) return true;
  for (let i = 2; i <= num / 2; i++) {
    if (num % i === 0) return false;
  }
  return true;
}
