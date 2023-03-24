function solution(number) {
    let answer = "";
    let numbers = [4, 1, 2];
    
    while(number !== 0) {
        let remainder = number % 3;
        answer = numbers[remainder] + answer;
        number = Math.floor((number-1) / 3);
    }
    
    return answer;
}