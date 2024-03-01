const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const [n, m] = input.shift().split(" ").map(Number);
  const board = Array.from({ length: input.length }, (_, i) =>
    input[i].split("").map(Number)
  );

  console.log(solve(n, m, board));
  process.exit();
});

const solve = (n, m, board) => {
  const queue = [];
  const visited = Array.from(
    { length: board.length },
    () => new Array(board[0].length)
  );
  const move_x = [1, -1, 0, 0];
  const move_y = [0, 0, 1, -1];
  let idx = 0;

  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < m; j += 1) {
      visited[i][j] = Array.from({ length: 2 }, () => 0);
    }
  }

  queue.push({ x: 0, y: 0, status: 0 });
  visited[0][0][0] = 1;

  while (idx !== queue.length) {
    const { x, y, status } = queue[idx];

    if (x === m - 1 && y === n - 1) {
      return visited[y][x][status];
    }

    for (let i = 0; i < 4; i += 1) {
      const axis_x = x + move_x[i];
      const axis_y = y + move_y[i];

      if (!isValidAxisRange(axis_x, axis_y, board)) {
        continue;
      }

      if (
        board[axis_y][axis_x] === 0 &&
        visited[axis_y][axis_x][status] === 0
      ) {
        visited[axis_y][axis_x][status] = visited[y][x][status] + 1;
        queue.push({
          x: axis_x,
          y: axis_y,
          status,
        });
      } else if (board[axis_y][axis_x] === 1 && status === 0) {
        visited[axis_y][axis_x][status + 1] = visited[y][x][status] + 1;
        queue.push({
          x: axis_x,
          y: axis_y,
          status: status + 1,
        });
      }
    }
    idx += 1;
  }

  return -1;
};

const isValidAxisRange = (axis_x, axis_y, board) => {
  if (axis_x > board[0].length - 1 || axis_x < 0) {
    return false;
  }
  if (axis_y > board.length - 1 || axis_y < 0) {
    return false;
  }

  return true;
};
