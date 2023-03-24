function solution(participant, completion) {
    let obj = {};
    let answer = "";
    
    completion.forEach(e => {
        if(obj[e] === undefined)
            obj[e] = 1;
        else if(obj[e] > 0)
            obj[e]++;
    })
    
    participant.forEach(e => {
        if(obj[e] > 0)
            obj[e]--;
        else
            answer += e;
    })
    
    return answer;
}