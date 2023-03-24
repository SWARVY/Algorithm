function solution(new_id) {
    let answer = '';
    let char_list = [
        '1','2','3','4','5','6','7','8','9','0',
        'a','b','c','d','e','f','g',
        'h','i','j','k','l','m','n',
        'o','p','q','r','s','t','u',
        'v','w','x','y','z','-','_','.'
    ];
    let cnt = 0;
    
    //1. change to lowercase
    answer = new_id.toLowerCase();
    answer = answer.split("");
    //2. sub chars
    answer = answer.filter(e => char_list.includes(e));
    //3. sub multiple '.'
    answer = answer.filter(e => {
        if(e === '.') 
            cnt++;
        else 
            cnt = 0;
        
        if(cnt <= 1) 
            return true;
    });
    //4. sub start '.' & end '.'
    if(answer[0] === '.')
        answer = answer.splice(1, answer.length);
    if(answer[answer.length - 1] === '.')
        answer = answer.splice(0, answer.length - 1);
    //5. is empty?
    if(answer.length === 0)
        answer.push('a');
    //6. is size bigger than 16?
    if(answer.length >= 16)
        answer = answer.splice(0, 15);
    if(answer[answer.length - 1] === '.')
        answer = answer.splice(0, answer.length - 1);
    //7. is size less than 2?
    if(answer.length <= 2) {
        while(answer.length !== 3)
            answer.push(answer[answer.length - 1]);
    }
        
    
    
    //result
    answer = answer.join('');
    return answer;
}