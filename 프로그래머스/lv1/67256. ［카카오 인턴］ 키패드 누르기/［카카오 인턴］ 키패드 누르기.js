function compare(number, state) {
    let distance = Math.abs(number - state);
    if(distance === 1 || distance === 3)
        return 1;
    else if(distance === 2 || distance === 4 || distance === 6)
        return 2;
    else if(distance === 5 || distance === 7 || distance === 9)
        return 3;
    else if(distance === 8 || distance === 10)
        return 4;
    else if(distance === 0)
        return 0;
}

function solution(numbers, hand) {
    let answer = [];
    let state = [10, 12];
    
    
    for(let i = 0 ; i < numbers.length ; i++) {
        let distance = [0, 0];
        if(numbers[i] === 1 || numbers[i] === 4 || numbers[i] === 7) {
            state[0] = numbers[i];
            answer.push("L");
        }else if(numbers[i] === 3 || numbers[i] === 6 || numbers[i] === 9) {
            state[1] = numbers[i];
            answer.push("R");
        }else { //2580
            if(numbers[i] === 0)
                numbers[i] = 11;
            
            distance[0] = compare(numbers[i], state[0]); //L
            distance[1] = compare(numbers[i], state[1]); //R
                        
            if(distance[0] > distance[1]) {
                state[1] = numbers[i];
                answer.push("R");
            }else if(distance[0] < distance[1]) {
                state[0] = numbers[i];
                answer.push("L");
            }else if(distance[0] == distance[1]) {
                if(hand === "left") {
                    state[0] = numbers[i];
                    answer.push("L");
                }else if(hand ==="right") {
                    state[1] = numbers[i]
                    answer.push("R");
                }
            }
        }
    }
    
    answer = answer.join("");
    return answer;
}