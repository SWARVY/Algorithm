const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const board = input.map((str) => str.split('').map(Number));
let flag = false;

const solve = () => {
  const copyBoard = JSON.parse(JSON.stringify(board));

  dfs(copyBoard, 0, 0);
};

const dfs = (currBoard, currY, currX) => {
  if (currY === 9) {
    print(currBoard);
    flag = true;
    return;
  }

  if (flag) {
    return;
  }

  if (board[currY][currX] === 0) {
    for (let i = 1; i <= 9; i += 1) {
      currBoard[currY][currX] = i;
      if (check(currBoard, currY, currX)) {
        currX < 9
          ? dfs(currBoard, currY, currX + 1)
          : dfs(currBoard, currY + 1, 0);
      }
      currBoard[currY][currX] = 0;
    }
  } else {
    currX < 9 ? dfs(currBoard, currY, currX + 1) : dfs(currBoard, currY + 1, 0);
  }
};

const check = (currBoard, currY, currX) => {
  const [startY, startX] = [areaSelector(currY), areaSelector(currX)];

  for (let i = 0; i < 9; i += 1) {
    if (currBoard[i][currX] === currBoard[currY][currX] && i !== currY) {
      return 0;
    }

    if (currBoard[currY][i] === currBoard[currY][currX] && i !== currX) {
      return 0;
    }
  }

  for (let i = startY; i < startY + 3; i += 1) {
    for (let j = startX; j < startX + 3; j += 1) {
      if (
        i !== currY &&
        j !== currX &&
        currBoard[i][j] === currBoard[currY][currX]
      ) {
        return 0;
      }
    }
  }

  return 1;
};

const areaSelector = (axis) => {
  if (axis < 3) {
    return 0;
  }

  if (axis < 6) {
    return 3;
  }

  if (axis < 9) {
    return 6;
  }
};

const print = (board) => {
  board.forEach((row) => console.log(row.join('')));
};

solve();
