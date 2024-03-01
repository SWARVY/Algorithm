const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(Number(line));
}).on("close", () => {
  const n = input.shift();

  console.log(solve(n));
  process.exit();
});

const solve = () => {
  const minHeap = new MinHeap();
  const answer = [];

  input.forEach((val) => {
    val === 0 ? answer.push(minHeap.poll()) : minHeap.push(val);
  });

  return answer.join("\n");
};

class MinHeap {
  heap = [];

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let currIdx = this.heap.length - 1;

    while (currIdx > 0) {
      const parentIdx = Math.floor((currIdx - 1) / 2);

      if (!this.heap[parentIdx]) {
        break;
      }

      if (this.heap[currIdx] > this.heap[parentIdx]) {
        break;
      }

      this.swap(currIdx, parentIdx);
      currIdx = parentIdx;
    }
  }

  poll() {
    if (this.heap.length === 0) {
      return 0;
    } else if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const minValue = this.heap[0];

    this.heap[0] = this.heap.pop();
    this.heapifyDown();

    return minValue;
  }

  heapifyDown() {
    let currIdx = 0;

    while (true) {
      let leftChildIdx = currIdx * 2 + 1;
      let rightChildIdx = currIdx * 2 + 2;
      const heapLen = this.heap.length;
      let smallestChildIdx = currIdx;

      if (
        leftChildIdx < heapLen &&
        this.heap[leftChildIdx] < this.heap[smallestChildIdx]
      ) {
        smallestChildIdx = leftChildIdx;
      }

      if (
        rightChildIdx < heapLen &&
        this.heap[rightChildIdx] < this.heap[smallestChildIdx]
      ) {
        smallestChildIdx = rightChildIdx;
      }

      if (smallestChildIdx !== currIdx) {
        this.swap(smallestChildIdx, currIdx);
        currIdx = smallestChildIdx;
      } else {
        break;
      }
    }
  }
}
