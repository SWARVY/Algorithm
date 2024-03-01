/**
 * @link https://www.acmicpc.net/problem/11279
 */
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
	input.push(Number(line));
}).on('close', () => {
	const n = input.shift();
	const result = solution(n, input);

	console.log(result.join('\n'));

	process.exit();
});

/**
 *
 * @param {number} n
 * @param {number[]} nums
 */
function solution(n, nums) {
	const answer = [];
	const maxHeap = new MaxHeap();

	nums.forEach((v) => {
		if (v === 0) {
			answer.push(maxHeap.getMaxAndDelete());
		} else {
			maxHeap.add(v);
		}
	});

	return answer;
}

class MaxHeap {
	constructor() {
		this.heap = [];
	}

	_swap(idx1, idx2) {
		[this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
	}

	add(value) {
		this.heap.push(value);

		let curIdx = this.heap.length - 1;

		while (0 < curIdx) {
			const parentIdx = Math.floor((curIdx - 1) / 2);

			// 부모 노드가 없으면
			if (!this.heap[parentIdx]) {
				break;
			}

			// 자식노드가 부모노드보다 클 경우
			if (this.heap[curIdx] <= this.heap[parentIdx]) {
				break;
			}

			// 부모노드와 자식노드를 스왑한다
			this._swap(curIdx, parentIdx);
			curIdx = parentIdx;
		}
	}

	getMaxAndDelete() {
		if (this.heap.length === 0) {
			return 0;
		} else if (this.heap.length === 1) {
			return this.heap.pop();
		}

		const max = this.heap[0];
		this.heap[0] = this.heap.pop();

		let curIdx = 0;

		while (true) {
			let leftChildIdx = curIdx * 2 + 1;
			let rightChildIdx = curIdx * 2 + 2;
			const len = this.heap.length;
			let largestIdx = curIdx;

			// 현재 노드보다 왼쪽 자식노드가 더 클 경우
			if (
				leftChildIdx < len &&
				this.heap[largestIdx] < this.heap[leftChildIdx]
			) {
				largestIdx = leftChildIdx;
			}

			// 현재 노드보다 오른쪽 자식노드가 더 클 경우
			if (
				rightChildIdx < len &&
				this.heap[largestIdx] < this.heap[rightChildIdx]
			) {
				largestIdx = rightChildIdx;
			}

			if (largestIdx !== curIdx) {
				// 현재 노드와 자식노드를 스왑한다
				this._swap(curIdx, largestIdx);
				curIdx = largestIdx;
			} else {
				break;
			}
		}

		return max;
	}
}
                    