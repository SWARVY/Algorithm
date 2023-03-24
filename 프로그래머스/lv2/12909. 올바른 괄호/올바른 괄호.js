function solution(s){
    const stack = [];
    
    [...s].forEach((symbol) => {        
        stack.push(symbol);
        
        if (stack.length > 1) {
            while (stack[stack.length - 1] === ')' && stack[stack.length - 2] === '(') {
                stack.pop();
                stack.pop();
            }
        }
    })
        
    if (stack.length) return false;
    return true;
}