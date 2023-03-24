//lottos와 win_nums의 교집합 배열을 만든다, 단 lottos의 원소가 0이면 교집합에 추가,
function solution(lottos, win_nums) {
    let answer = [];
    let res;
    let cnt;
    
    res = lottos.filter(e => win_nums.includes(e) || e === 0);
    cnt = (res.filter(e => e === 0)).length;
    
    //최고경우
    console.log(res.length);
    //최저경우
    console.log(res.length - cnt);
    
    if(7 - res.length < 6)
        answer.push(7 - res.length);
    else
        answer.push(6);
    
    if(7 - (res.length - cnt) < 6)
        answer.push(7 - (res.length - cnt));
    else
        answer.push(6);
    
    return answer;
}