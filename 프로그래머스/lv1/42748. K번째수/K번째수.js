function solution(array, commands) {
    var answer = [];
    
    for(let i in commands) {
        let part = array.slice(commands[i][0] - 1, commands[i][1]);
        part.sort(function(a, b) {
            if(a > b) return 1;
            else if(a < b) return -1;
            else return 0;
        });
        answer.push(part[commands[i][2] - 1]);
    }
    
    return answer;
}