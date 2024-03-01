const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const dy = [0, 0, 1, -1];
const dx = [1, -1, 0, 0];

const solve = () => {
  const [n, m] = input.shift().split(" ").map(Number);
  const board = Array.from({ length: n }, (_, idx) =>
    input[idx].split(" ").map(Number)
  );
  let queue = [];
  let currDepth = 0;
  let cnt = 0;

  // queue에 노드 추가
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < m; j += 1) {
      if (board[i][j] !== 0) {
        queue.push({ axis: [i, j], val: board[i][j], depth: 0 });
        cnt += 1;
      }
    }
  }

  while (queue.length) {
    if (queue[0].depth !== currDepth) {
      const temp_queue = [];

      for (let i = 0; i < queue.length; i += 1) {
        if (queue[i].val > 0) {
          temp_queue.push(queue[i]);
        }

        if (queue[i].val <= 0) {
          cnt -= 1;
        }

        board[queue[i].axis[0]][queue[i].axis[1]] =
          queue[i].val > 0 ? queue[i].val : 0;
      }

      queue = temp_queue;

      if (cnt === 0) {
        return 0;
      }

      if (isSplitted(n, m, queue, board)) {
        return queue[0].depth;
      }

      currDepth += 1;
    }

    const { axis, val, depth } = queue.shift();
    let temp = 0;

    for (let i = 0; i < 4; i += 1) {
      const moveY = axis[0] + dy[i];
      const moveX = axis[1] + dx[i];

      if (
        depth === currDepth &&
        moveY >= 0 &&
        moveY < n &&
        moveX >= 0 &&
        moveX < m
      ) {
        if (board[moveY][moveX] === 0) {
          temp += 1;
        }
      }
    }

    queue.push({ axis, val: val - temp, depth: depth + 1 });
  }

  return 0;
};

const isSplitted = (n, m, queue, board) => {
  const copy_queue = [...queue];
  const visited = Array.from({ length: n }, () => new Array(m).fill(false));
  const check_queue = [];
  const { axis } = copy_queue.shift();
  let cnt = 0;

  check_queue.push(axis);
  visited[axis[0]][axis[1]] = true;
  cnt += 1;

  while (check_queue.length) {
    const [currY, currX] = check_queue.shift();

    for (let i = 0; i < 4; i += 1) {
      const moveY = currY + dy[i];
      const moveX = currX + dx[i];

      if (moveY >= 0 && moveY < n && moveX >= 0 && moveX < m) {
        if (board[moveY][moveX] !== 0 && !visited[moveY][moveX]) {
          visited[moveY][moveX] = true;
          check_queue.push([moveY, moveX]);
          cnt += 1;
        }
      }
    }
  }

  return queue.length !== cnt;
};

console.log(solve());
