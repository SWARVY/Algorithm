function getGcd(a, b) {
    let min = Math.min(a, b);
    let max = Math.max(a, b);
    let rest = max % min;
    
    if(rest === 0) return min;
    
    return getGcd(min, rest);
}

function solution(w, h) {
    let answer;
    let gcd = getGcd(w, h);
        
    answer = w * h - (w + h) + gcd;
    
    return answer;
}