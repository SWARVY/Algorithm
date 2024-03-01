const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const board = input.map((str) => str.split(""));
const flat_board = board.flat();
let answer = 0;

const solve = () => {
  for (let i = 0; i < 25; i += 1) {
    const visited = Array.from({ length: 25 }, () => false);
    dfs(i, flat_board[i] === "S" ? 1 : 0, 1, visited);
  }

  console.log(answer);
};

const dfs = (curr, s_cnt, total_cnt, visited) => {
  visited[curr] = true;

  if (total_cnt === 7) {
    if (s_cnt >= 4 && check(visited)) {
      answer += 1;
    }
  } else {
    for (let i = curr + 1; i < 25; i += 1) {
      if (!visited[i]) {
        dfs(
          i,
          flat_board[i] === "S" ? s_cnt + 1 : s_cnt,
          total_cnt + 1,
          visited
        );
      }
    }
  }

  visited[curr] = false;
};

// visited는 1차원배열짜리가 늘어져있는 것
// queue에는 2차원배열 형태의 좌표가 들어가야함
const check = (visited) => {
  const dy = [0, 0, 1, -1];
  const dx = [1, -1, 0, 0];
  const queue = [];
  const copy_visited = [...visited];
  let cnt = 0;

  for (let i = 0; i < 25; i += 1) {
    const [axisY, axisX] = [Math.floor(i / 5), i % 5];

    if (visited[i]) {
      queue.push([axisY, axisX]);
      copy_visited[i] = false;
      cnt += 1;
      break;
    }
  }

  while (queue.length) {
    const axis = queue.shift();

    for (let i = 0; i < 4; i += 1) {
      const [moveY, moveX] = [axis[0] + dy[i], axis[1] + dx[i]];

      if (moveY >= 0 && moveY < 5 && moveX >= 0 && moveX < 5) {
        if (copy_visited[moveY * 5 + moveX]) {
          copy_visited[moveY * 5 + moveX] = false;
          queue.push([moveY, moveX]);
          cnt += 1;
        }
      }
    }
  }

  return cnt === 7;
};

solve();
