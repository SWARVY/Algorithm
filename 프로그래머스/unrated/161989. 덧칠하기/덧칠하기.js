function solution(n, m, section) {
    let startIdx = section[0];
    let cnt = 1;
    
    for (let i = 0; i < section.length; i++) {
        if (section[i] >= startIdx && section[i] <= startIdx + m - 1)
            continue;
        startIdx = section[i];
        cnt += 1;
    }
    return cnt;
}