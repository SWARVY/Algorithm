function solution(name, yearning, photo) {
    const map = new Map();
    const res = new Array(photo.length).fill(0);
    
    for (let i = 0; i < name.length; i++)
        map.set(name[i], yearning[i]);
    photo.forEach((p, idx) => {
        p.forEach((val) => {
            if (map.has(val))
                res[idx] += map.get(val);
        });
    });
    return res;
}