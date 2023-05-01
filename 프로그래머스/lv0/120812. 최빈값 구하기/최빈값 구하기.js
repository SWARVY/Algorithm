function solution(array) {
    let numbers = new Map();
    
    for (let number of array) numbers.set(number, (numbers.get(number) || 0) + 1);
    numbers = [...numbers].sort((a, b) => b[1] - a[1]);
    return numbers.length === 1 || numbers[0][1] - numbers[1][1] > 0 ? numbers[0][0] : -1;
}