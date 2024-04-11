function solution(s) {
    let answer = 0;
    s = s.split(' ');
    
    s.forEach((element, index) => {
        if (element === 'Z') {
            answer -= Number(s[index - 1]);
        } else {
            answer += Number(element);
        }
    })
    
    return answer;
}
