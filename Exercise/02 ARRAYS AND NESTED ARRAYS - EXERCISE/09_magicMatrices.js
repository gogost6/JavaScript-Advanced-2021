function solve(matrix) {
    let sum = matrix[0].reduce((a,c) => a+c);
    let isTrue = true;
    for (let i = 0; i < matrix.length; i++) {
        const x = matrix[i].reduce((a,c) => a+c);
        if(x != sum) {
            isTrue = false;
            break;
        }
        let y = matrix[i][0];
        for (let j = 1; j < matrix.length; j++) {
            y += matrix[i][j];
        }
        if(y != sum) {
            isTrue = false;
            break;
        }
    }
    if(isTrue) {
        console.log(isTrue);
    } else {
        console.log(isTrue);
    }
}
solve([
    [4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]
]);
solve([
    [11, 32, 45],
    [21, 0, 1],
    [21, 1, 1]
]);