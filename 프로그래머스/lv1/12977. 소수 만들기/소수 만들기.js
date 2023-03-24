function is_primeNum(num) {
    let sum = 0;
    
    num.forEach(e => {
        sum += e;
    })
    
    for(let i = 2 ; i < sum - 1 ; i++) {
        if(sum % i === 0)
            return 0;
    }
    
    return 1;
}

function get_Combination(nums, select_number) {
    let res = [];
    if(select_number === 1)
        return nums.map(e => [e]);
    
    nums.forEach((fixed, index, array) => {
        let rest = array.slice(index + 1, array.length);
        let combination = get_Combination(rest, select_number - 1);
        let attached = combination.map(e => [fixed, ...e]);
        
        res.push(...attached);
    });
    
    return res;
}

function solution(nums) {
    let answer = 0;
    let cnt = 0;
    let res = get_Combination(nums, 3);
    
    res.forEach(e => {
        answer += is_primeNum(e);
    })
    
    return answer;
}