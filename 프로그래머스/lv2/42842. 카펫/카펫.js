function solution(brown, yellow) {
    const size = brown + yellow;
    
    for (let i = 1; i < size; i++) {
        for (let j = 1; j < size; j++) {
            if (i * j > size)
                break;
            if (i >= j && i * j === size
                && ((i - 2) * (j - 2)) === yellow)
                return [i, j];
        }
    }
}