function solve(arr) {
    let max = arr[0][0];
    for(let i = 0; i < arr.length; i++) {
        for (let a = 0; a < arr[i].length; a++) {
            if(arr[i][a] > max) {
                max = arr[i][a];
            }
        }
    }
    return max;
}
console.log(solve([
    [20, 50, 10],
    [8, 33, 145]
        ]));
console.log(solve([
    [3, 5, 7, 12],
    [-1, 4, 33, 2],
    [8, 3, 0, 4]
]))