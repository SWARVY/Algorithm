const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const amount = Number(input.shift());
const commands = input[0].split(" ").map(Number);

class Node {
  prev = null;
  next = null;
  constructor(value) {
    this.value = value;
  }
}

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push_front(value) {
    const newNode = new Node(value);
    if (this.empty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length += 1;
  }

  push_back(value) {
    const newNode = new Node(value);
    if (this.empty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length += 1;
  }

  pop_front() {
    if (this.empty()) return -1;
    const front = this.front();
    this.head = this.head.next;
    this.length -= 1;
    return front;
  }

  pop_back() {
    if (this.empty()) return -1;
    const back = this.back();
    this.tail = this.tail.prev;
    this.length -= 1;
    return back;
  }

  size() {
    return this.length;
  }

  empty() {
    return this.length === 0 ? 1 : 0;
  }

  front() {
    if (this.empty()) return -1;
    return this.head.value;
  }

  back() {
    if (this.empty()) return -1;
    return this.tail.value;
  }

  *[Symbol.iterator]() {
    let tmp = this.head;
    while (tmp) {
      yield tmp.value;
      tmp = tmp.next;
    }
  }
}

// 순서가 어떻게 들어오건 마지막의 상태가 1 2 3 4 5이다
const solve = () => {
  const cards = new Deque();
  let curr = 1;

  for (let i = amount - 1; i >= 0; i -= 1) {
    // console.log(cards);
    if (commands[i] === 1) {
      cards.push_front(curr);
    } else if (commands[i] === 2) {
      const temp = cards.pop_front();
      cards.push_front(curr);
      cards.push_front(temp);
    } else {
      cards.push_back(curr);
    }

    curr += 1;
  }

  console.log([...cards].join(" "));
};

solve();
