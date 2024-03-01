// 10026: 적록색약
// 요약 : 적록색약인 사람들과 일반 사람들이 볼 수 있는 구역의 수를 나타내라
// 좌표는 [y, x]

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const solve = () => {
  const n = Number(input.shift());
  const board = input.map((v) => v.split(""));
  const answer = [];

  answer.push(check(n, board, false));
  answer.push(check(n, board, true));
  console.log(answer.join(" "));
};

const check = (n, board, isColorWeakness) => {
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];
  const visited = Array.from({ length: n }, () => new Array(n).fill(false));
  const queue = [];
  let visitCount = 0;
  let count = 1;

  queue.push({ axis: [0, 0], color: board[0][0] });
  visited[0][0] = true;
  visitCount += 1;

  while (visitCount < n * n) {
    if (!queue.length) {
      const emptyAxis = findEmpty(visited);

      if (emptyAxis === -1) {
        break;
      }

      queue.push({ axis: emptyAxis, color: board[emptyAxis[0]][emptyAxis[1]] });
      visited[emptyAxis[0]][emptyAxis[1]] = true;
      visitCount += 1;
      count += 1;
    }

    const { axis, color } = queue.shift();

    for (let i = 0; i < 4; i += 1) {
      const currYAxis = axis[0] + dy[i];
      const currXAxis = axis[1] + dx[i];

      if (currXAxis >= 0 && currXAxis < n && currYAxis >= 0 && currYAxis < n) {
        if (!isColorWeakness) {
          if (
            !visited[currYAxis][currXAxis] &&
            board[currYAxis][currXAxis] === color
          ) {
            queue.push({
              axis: [currYAxis, currXAxis],
              color: board[currYAxis][currXAxis],
            });
            visited[currYAxis][currXAxis] = true;
            visitCount += 1;
          }
        } else {
          if (
            !visited[currYAxis][currXAxis] &&
            checkColorWeakness(board[currYAxis][currXAxis], color)
          ) {
            queue.push({
              axis: [currYAxis, currXAxis],
              color: board[currYAxis][currXAxis],
            });
            visited[currYAxis][currXAxis] = true;
            visitCount += 1;
          }
        }
      }
    }
  }

  return count;
};

const findEmpty = (visited) => {
  for (let i = 0; i < visited.length; i += 1) {
    for (let j = 0; j < visited.length; j += 1) {
      if (!visited[i][j]) {
        return [i, j];
      }
    }
  }

  return -1;
};

const checkColorWeakness = (currColor, nodeColor) => {
  if (
    (currColor === "R" || currColor === "G") &&
    (nodeColor === "R" || nodeColor === "G")
  ) {
    return true;
  } else if (currColor === "B" && nodeColor === "B") {
    return true;
  }

  return false;
};

solve();
