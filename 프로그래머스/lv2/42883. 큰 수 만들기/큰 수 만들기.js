function solution(number, k) {
    const stack = [];
    
    for (let i = 0; i < number.length; i++) {
        const val = number[i];
        while (k && stack[stack.length - 1] < val) {
            stack.pop();
            k -= 1;
        }
        stack.push(val);
    }
    stack.splice(stack.length - k, k);
    return stack.join('');
}