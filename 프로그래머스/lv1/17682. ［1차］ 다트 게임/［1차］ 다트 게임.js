function solution(dartResult) {
    let answer = 0;
    let point = dartResult.match(/\d+/g); // 점수들만 따로 정규표현식으로 분리
    let calculated = []; // 옵션들을 포함하여 계산된 점수들을 담는 배열
    let cnt = 0;

    [...dartResult].forEach(opt => {
        if (opt === 'S') // dartResult를 순회하면서 S,D,T *,#에 따른 결과값만 구함
            calculated.push(parseInt(point[cnt++]));
        else if (opt === 'D')
            calculated.push(parseInt(point[cnt++]) ** 2);
        else if (opt === 'T')
            calculated.push(parseInt(point[cnt++]) ** 3);
        else if (opt === '*')
        {
            calculated[calculated.length - 1] *= 2; // 배열의 현재 길이를 기준으로 2배
            calculated[calculated.length - 2] *= 2; 
        }
        else if (opt === '#')
            calculated[calculated.length - 1] *= -1; // 배열의 현재 길이를 기준으로 -1배
    });
    
    calculated.forEach(el => { // 합산
        answer += el;
    });
    return answer;
}
