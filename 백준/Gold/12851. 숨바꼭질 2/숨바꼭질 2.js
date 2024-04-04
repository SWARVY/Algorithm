const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, k] = input[0].split(' ').map(Number);

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
    if (this.front === null) {
      this.front = node;
      this.front.next = this.rear;
    } else this.rear.next = node;
    this.rear = node;
    this.size += 1;
  }

  deQueue() {
    if (this.size === 1) {
      const temp = this.front.item;
      this.front = null;
      this.rear = null;
      this.size -= 1;
      return temp;
    } else if (this.size === 2) {
      const temp = this.front.item;
      const front = this.front.next;
      this.front = front;
      this.rear = front;
      this.size -= 1;
      return temp;
    } else if (this.size > 2) {
      const temp = this.front.item;
      this.front = this.front.next;
      this.size -= 1;
      return temp;
    }
  }

  getSize() {
    return this.size;
  }
}

const solve = () => {
  const queue = new Queue();
  const visited = {};
  const answer = [];

  queue.enQueue({ val: n, depth: 0 });
  visited[n] = 0;

  while (queue.getSize()) {
    const { val, depth } = queue.deQueue();

    if (val === k) {
      answer.push(depth);
      continue;
    }

    const nextPositions = [val * 2, val + 1, val - 1];

    for (const nextPos of nextPositions) {
      if (
        nextPos >= 0 &&
        nextPos <= 100000 &&
        (!visited[nextPos] || visited[nextPos] >= depth + 1)
      ) {
        queue.enQueue({ val: nextPos, depth: depth + 1 });
        visited[nextPos] = depth + 1;
      }
    }
  }

  console.log(answer[0]);
  console.log(answer.length);
};

solve();
