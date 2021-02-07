function solve(matrix) {
    let firstDiag = 0;
    let secDiag = 0;
    let c = 0;
    for (let i = 0; i < matrix.length; i++) {
            firstDiag += matrix[i][c];
            secDiag += matrix[i][matrix.length - i - 1];
            c++;
    }
    let result = firstDiag + ' ' + secDiag;
    console.log(result);
}
// solve([
//     [20, 40],
//     [10, 60]
// ]);
solve([
    [3, 5, 17],
    [-1, 7, 14],
    [1, -8, 89]
]);