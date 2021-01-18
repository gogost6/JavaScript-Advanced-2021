function solve(arr) {
    return arr.reduce(function(result, curr, i, initialArr) {
        if(curr >= result[result.length - 1] || result.length === 0) {
            result.push(curr);
        }
        return result;
    }, [])
}
console.log(solve([1, 
    3, 
    8, 
    4, 
    10, 
    12, 
    3, 
    2, 
    24]));