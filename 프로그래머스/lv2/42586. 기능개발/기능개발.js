function solution(progresses, speeds) {
    const answer = [];
    const end = progresses.length - 1;
    let index = 0;
    let count = 0;
    
    while(index <= end) {
        console.log(count);
        if(progresses[index] < 100) {
            if(count !== 0) {
                answer.push(count);
                count = 0;
            }
            for(let j = 0 ; j <= end ; j++)
                progresses[j] += speeds[j];
        } else {
            count++;
            index++;
        }
    }
    
    if(count !== 0)
        answer.push(count);
    return answer;
}