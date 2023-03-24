function compare(answer, list) {
    let cnt = 0;
    while(list.length < answer.length)
        list = [...list, ...list];
    
    for(let i in answer) {
        if(answer[i] === list[i])
            cnt++;
    }
    
    return cnt;
}

function solution(answers) {
    var answer = [];
    let ans_list = [
        [1, 2, 3, 4, 5],
        [2, 1, 2, 3, 2, 4, 2, 5],
        [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
    ];
    let max = 0;
    
    for(let i = 0 ; i < ans_list.length ; i++) {
        let cnt = compare(answers, ans_list[i]);
        if(cnt >= max)
            max = cnt;
    }
        
    for(let i = 0 ; i < ans_list.length ; i++) {
        let cnt = compare(answers, ans_list[i]);
        if(max === cnt)
            answer.push(i + 1);
    }
    
    return answer.sort();
}