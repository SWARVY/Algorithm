function solution(record) {
    let answer = [];
    let name_list = new Map();
    
    //id에 맞는 이름을 먼저 할당한 뒤 출력
    for(let i in record) {
        //data[0] state, data[1] id, data[2] name
        let data;
        data = record[i].split(" ");
        
        if(data[0] !== "Leave")
            name_list.set(data[1], data[2]);
        
    }
    
    for(let i in record) {
        //data[0] state, data[1] id, data[2] name
        let data;
        data = record[i].split(" ");
        
        if(data[0] === "Enter")
            answer.push(name_list.get(data[1]) + "님이 들어왔습니다.")
        else if(data[0] === "Leave")
            answer.push(name_list.get(data[1]) + "님이 나갔습니다.")
        
    }
    
    return answer;
}