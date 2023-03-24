function solution(id_list, report, k) {
    let answer = new Array(id_list.length);
    let reported = new Set();
    answer.fill(0);
    
    id_list.map(user => {
        reported[user] = [];
    })
    
    report.map(user => {
        const [user_id, report_id] = user.split(" ");
        if(!reported[report_id].includes(user_id))
            reported[report_id].push(user_id);
    })
    
    for(const key in reported) {
        if(reported[key].length >= k) {
            reported[key].map(user => {
                answer[id_list.indexOf(user)]++;
            })
        }
    }
    
    return answer;
}