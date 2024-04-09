const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input.shift().split(' ').map(Number);

class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  enQueue(item) {
    const node = new Node(item);

    if (!this.front) {
      this.front = node;
    } else {
      this.rear.next = node;
    }

    this.rear = node;
    this.size += 1;
  }

  deQueue() {
    if (!this.front) {
      return false;
    }

    const temp = this.front.item;
    this.front = this.front.next;
    this.size -= 1;

    return temp;
  }

  getSize() {
    return this.size;
  }
}

const dy = [0, 0, 1, -1];
const dx = [1, -1, 0, 0];
const board = input.map((row) => row.split('').map(Number));
const group = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => 0)
);
const groupCnt = Array.from({ length: 1001 }, () => 0);
let groupId = 1;

const solve = () => {
  const wall = [];

  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < m; j += 1) {
      if (board[i][j] === 0 && group[i][j] === 0) {
        bfs(i, j);
        groupId += 1;
      } else if (board[i][j] === 1) {
        wall.push({ y: i, x: j });
      }
    }
  }

  for (let i = 0; i < wall.length; i += 1) {
    const { y, x } = wall[i];

    board[y][x] = calculate(y, x);
  }

  print(board);
};

const bfs = (yAxis, xAxis) => {
  const queue = new Queue();
  let cnt = 0;

  queue.enQueue({ y: yAxis, x: xAxis });
  group[yAxis][xAxis] = groupId;

  while (queue.getSize()) {
    const { y, x } = queue.deQueue();

    cnt += 1;

    for (let i = 0; i < 4; i += 1) {
      const [moveY, moveX] = [y + dy[i], x + dx[i]];

      if (check(moveY, moveX)) {
        if (board[moveY][moveX] === 0 && group[moveY][moveX] === 0) {
          queue.enQueue({ y: moveY, x: moveX });
          group[moveY][moveX] = groupId;
        }
      }
    }
  }

  groupCnt[groupId] = cnt;
};

const calculate = (yAxis, xAxis) => {
  const set = new Set();
  let cnt = 1;

  for (let i = 0; i < 4; i += 1) {
    const [moveY, moveX] = [yAxis + dy[i], xAxis + dx[i]];

    if (check(moveY, moveX) && group[moveY][moveX] !== 0) {
      set.add(group[moveY][moveX]);
    }
  }

  set.forEach((val) => (cnt += groupCnt[val]));

  return cnt % 10;
};

const check = (y, x) => y >= 0 && y < n && x >= 0 && x < m;

const print = (group) => {
  group.forEach((row) => console.log(row.join('')));
};

solve();
