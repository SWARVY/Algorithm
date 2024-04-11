const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const testCase = +input.shift();
const answer = [];
let cnt = 0;

const solve = () => {
  for (let i = 0; i < testCase; i += 1) {
    const studentCnt = +input.shift();
    const studentNum = input.shift().split(' ').map(Number);

    studentNum.unshift(0);
    answer.push(buildTeam(studentCnt, studentNum));
    cnt = 0;
  }

  console.log(answer.join('\n'));
};

const buildTeam = (studentCnt, studentNum) => {
  const visited = Array.from({ length: studentCnt + 1 }, () => false);
  const done = Array.from({ length: studentCnt + 1 }, () => false);

  for (let i = 1; i <= studentCnt; i += 1) {
    if (!visited[i]) {
      dfs(i, done, studentNum, visited);
    }
  }

  return studentCnt - cnt;
};

const dfs = (curr, done, studentNum, visited) => {
  const next = studentNum[curr];

  visited[curr] = true;

  if (!visited[next]) {
    dfs(next, done, studentNum, visited);
  } else if (!done[next]) {
    for (let i = next; i !== curr; i = studentNum[i]) {
      cnt += 1;
    }

    cnt += 1;
  }

  done[curr] = true;
};

solve();
