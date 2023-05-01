function solution(array) {
    const numbers = new Set(array);
    const results = [];
    let maxArray = null;
    let max = -1;
    
    for (let number of numbers)
        results.push({value: number, count: 0});
    
    array.forEach((number) => {
        const idx = results.findIndex((obj) => obj.value === number);
        results[idx].count += 1;
    });
    
    max = Math.max(...results.map(obj => obj.count));
    maxArray = results.filter((obj) => obj.count === max);
    
    if (maxArray.length > 1)
        return -1;
    return maxArray[0].value;
}