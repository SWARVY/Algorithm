function solution(name) {
    let answer = 0;
    let min = name.length - 1;
    
    [...name].map((value, idx) => {
        let curr = idx + 1;
        
        answer += Math.min(
            Math.abs(value.charCodeAt() - 65), 
            Math.abs(value.charCodeAt() - 91));
        while (curr < name.length && name[curr] === 'A')
            curr += 1;
        
        min = Math.min(min, idx * 2 + name.length - curr, idx + 2 * (name.length - curr));
    });
    return answer + min;
}