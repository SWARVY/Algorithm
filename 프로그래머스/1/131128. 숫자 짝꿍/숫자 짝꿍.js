function solution(X, Y) {
    const arrX = X.split('').map(Number);
    const arrY = Y.split('').map(Number);
    const mapY = new Map();
    const answer = [];
    
    arrY.forEach((val) => {
        if (mapY.has(val)) {
            const curr = mapY.get(val);
            mapY.set(val, curr + 1);
        } else {
            mapY.set(val, 1);
        }
    });
    
    arrX.forEach((val) => {
        if (mapY.has(val) && mapY.get(val) > 0) {
            const curr = mapY.get(val);
            answer.push(val);
            mapY.set(val, curr - 1);
        }
    });
    
    if (!answer.length) {
        return '-1'
    }
    
    answer.sort((a, b) => b - a);
    
    return answer[0] !== 0 ? answer.join('') : '0'
}