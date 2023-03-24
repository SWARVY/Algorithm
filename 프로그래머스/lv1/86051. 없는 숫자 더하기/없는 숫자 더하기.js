function solution(numbers) {
    let answer = 45;
    
    numbers.forEach(e => {
        answer -= e;
    })
    
    return answer;
}