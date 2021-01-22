function solve(matrix) {
    let pairs = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let a = 0; a < matrix[i].length; a++) {
            const element = matrix[i][a];
            if(i < matrix.length - 1) {
                if(element === matrix[i+1][a]) {
                    pairs++;
                }
            }
            if(a+1 < matrix.length) {
                if(element === matrix[i][a+1]) {
                    pairs++;
                }
            }
        }
    }
    return pairs;
}
console.log(solve([
    [2,2,5,7,4],
    [4,0,5,3,4],
    [2,5,5,4,2]
]));
// console.log(solve([
//     ['2', '3', '4', '7', '0'],
//     ['4', '0', '5', '3', '4'],
//     ['2', '3', '5', '4', '2'],
//     ['9', '8', '7', '5', '4']
// ]));
// console.log(solve([
//     ['test', 'yes', 'yo', 'ho'],
//     ['well', 'done', 'yo', '6'],
//     ['not', 'done', 'yet', '5']
// ]));