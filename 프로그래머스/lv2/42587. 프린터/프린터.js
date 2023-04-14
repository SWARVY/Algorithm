function solution(priorities, location) {
    const array = [];
    const complete = [];
    
    priorities.forEach((value, index) => {array.push({value, index})});
    while (array.length) {
        const max = sorting(array)[0].value;
        const curr = array.shift();
        
        if (curr.value >= max) complete.push(curr);
        else array.push(curr);
    }
    // console.log(complete);
    return (complete.findIndex(e => e.index === location) + 1);
}

function sorting(array) {
    return [...array].sort((a, b) => a.value > b.value ? -1 : 1);
}