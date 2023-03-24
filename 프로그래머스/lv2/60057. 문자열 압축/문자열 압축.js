function solution(s) {
    let answer = 9999;
    let res = [];
    
    for(let i = 1 ; i <= Math.ceil(s.length / 2) ; i++) {
        let idx = 0;
        let cnt = []; //중복원소 개수
        
        while(idx <= s.length) {
            if(s.substring(idx, idx + i) !== '')
                res.push(s.substring(idx, idx + i));
            idx += i;
        }
        
        let temp = 0;
        for(let j = 0 ; j < res.length ; j++) {
            if(res[j] === res[j-1]) 
                temp++;
            if(res[j] !== res[j-1] || j === res.length - 1) {
                if(temp !== 0) {
                    cnt.push(temp);
                    temp = 0;
                }
            }
        }
        
        let dupl_sum = 0;
        cnt.forEach(e => {
            dupl_sum += e * i;
        })
        
        let dupl_length = 0;
        cnt.forEach(e => {
            dupl_length += (e + 1).toString().length;
        })
                
        if(answer >= s.length - dupl_sum + dupl_length)
            answer = s.length - dupl_sum + dupl_length;
                
        res.length = 0;
    }
    
    return answer;
}