const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const horseX = [2, 2, 1, 1, -1, -1, -2, -2];
const horseY = [1, -1, 2, -2, 2, -2, 1, -1];

const solve = () => {
  const K = Number(input.shift());
  const [W, H] = input.shift().split(" ").map(Number);
  const board = input.map((str) => str.split(" ").map(Number));
  const visited = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => Array(K + 1).fill(false))
  );

  const queue = [{ x: 0, y: 0, horseMoves: 0, depth: 0 }];
  visited[0][0][0] = true;

  while (queue.length) {
    const { x, y, horseMoves, depth } = queue.shift();

    if (x === W - 1 && y === H - 1) {
      console.log(depth);
      return;
    }

    // 일반 이동
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        nx >= 0 &&
        nx < W &&
        ny >= 0 &&
        ny < H &&
        board[ny][nx] === 0 &&
        !visited[ny][nx][horseMoves]
      ) {
        visited[ny][nx][horseMoves] = true;
        queue.push({ x: nx, y: ny, horseMoves, depth: depth + 1 });
      }
    }

    // 말의 이동
    if (horseMoves < K) {
      for (let i = 0; i < 8; i++) {
        const nx = x + horseX[i];
        const ny = y + horseY[i];

        if (
          nx >= 0 &&
          nx < W &&
          ny >= 0 &&
          ny < H &&
          board[ny][nx] === 0 &&
          !visited[ny][nx][horseMoves + 1]
        ) {
          visited[ny][nx][horseMoves + 1] = true;
          queue.push({
            x: nx,
            y: ny,
            horseMoves: horseMoves + 1,
            depth: depth + 1,
          });
        }
      }
    }
  }

  console.log(-1);
};

solve();
