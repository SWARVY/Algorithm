const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const [n, k] = input.shift().split(" ").map(Number);
  solve(n, k);
  process.exit();
});

const solve = (n, k) => {
  const students = Array.from({ length: 25 }, () => new Queue());
  let answer = 0;

  for (let i = 0; i < n; i += 1) {
    const len = input[i].length;

    while (students[len].getSize() && i - students[len].printFront() > k) {
      students[len].deQueue();
    }

    answer += students[len].getSize();
    students[len].enQueue(i);
  }

  console.log(answer);
};

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

  printFront() {
    return this.front.item;
  }

  printBack() {
    return this.rear.item;
  }
}
