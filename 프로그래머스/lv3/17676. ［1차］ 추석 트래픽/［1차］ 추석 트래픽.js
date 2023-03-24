function compare(criteria, compare_point, cnt) {
    if(criteria <= compare_point.start_time && criteria + 999 >= compare_point.start_time)
        return 1;
    else if(criteria <= compare_point.finish_time && criteria + 999 >= compare_point.finish_time)
        return 1;
    else if(criteria > compare_point.start_time && criteria + 999 < compare_point.finish_time)
        return 1;
    else
        return 0;
}

function solution(lines) {
    let answer = 0;
    let list = [];
    
    lines.forEach(e => {
        let [day, time, prcs_time] = e.split(" ");
        let [hour, min, sec, m_sec] = time.split(/:|[.]/);
        let [last, s] = prcs_time.split(/s/);
                
        let start_time = new Date(2016, 8, 15, hour, min, sec, m_sec).getTime();
        let finish_time = new Date(2016, 8, 15, hour, min, sec, m_sec).getTime();
        start_time -= last * 1000 - 1;
                
        let data = { 
            start_time : start_time,
            finish_time : finish_time
        }
        
        list.push(data);
    });
    
    console.log(list);
    
    for(let i in list) {
        let cnt = [0, 0];
        
        //시작점을 기준으로 한 1초 범위
        for(let j in list)
            cnt[0] += compare(list[i].start_time, list[j], cnt[0]);
        
        //종료점을 기준으로 한 1초 범위
        for(let j in list)
            cnt[1] += compare(list[i].finish_time, list[j], cnt[1]);
        
        cnt.forEach(e => {
            if(e >= answer)
                answer = e;
        });
        
        console.log(cnt);
        
        cnt.fill(0);
        
    }

    return answer;
}