const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const amount = Number(input.shift());

  for (let i = 0; i < amount; i += 1) {
    solve();
  }

  process.exit();
});

const solve = () => {
  const [n, m, k] = input.shift().split(" ").map(Number);
  const map = input.shift().split(" ").map(Number);
  const concattedMap = n !== m ? [...map, ...map.slice(0, m - 1)] : map;
  const current = {
    house: new Queue(),
    total: 0,
  };
  let answer = 0;

  for (let i = 0; i < concattedMap.length; i += 1) {
    current.house.enQueue(concattedMap[i]);
    current.total += concattedMap[i];

    if (current.house.getSize() === m && current.total < k) {
      const firstValue = current.house.deQueue();
      answer += 1;
      current.total -= firstValue;
    } else if (current.house.getSize() === m && current.total >= k) {
      const firstValue = current.house.deQueue();
      current.total -= firstValue;
    }
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
