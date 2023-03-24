function solution(s, skip, index) {
    let answer = '';
    let curr = 0;
    let alphabet = Array.from({length: 26}, (value, idx) => String.fromCharCode(idx + 97));
    
    skip.split("").forEach((skipChar) => {
        let idx = alphabet.indexOf(skipChar);
        alphabet.splice(idx, 1);
    })
    
    s.split("").forEach((char) => {
        let idx = alphabet.indexOf(char);
        curr = idx + index;
        while (curr >= alphabet.length)
            curr -= (alphabet.length);
        answer += alphabet[curr];
    })
    return answer;
}