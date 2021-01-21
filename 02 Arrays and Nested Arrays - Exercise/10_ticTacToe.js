function solve(arr) {
    let matrix = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ]
    let isTaken = false;
    let isWin = false;
    let isFullBool = false;
    let winner = '';
    for (let i = 0; i < arr.length; i++) {
        let [row, index] = arr[i].split(' ').map(Number);
        if (matrix[row][index] == false) {
            if (!isTaken) {
                i % 2 == 0 ? matrix[row][index] = 'X' : matrix[row][index] = 'O';
            } else {
                i % 2 != 0 ? matrix[row][index] = 'X' : matrix[row][index] = 'O';
            }
            fullChecker(matrix, i);
            if(isFullBool) { break; }
        } else {
            fullChecker(matrix, i);
            if(isFullBool) { break; }
            isTaken == false ? isTaken = true : isTaken = false;
            console.log("This place is already taken. Please choose another!");
        }

        checker(matrix);
        if (isWin) {
            console.log(`Player ${winner} wins!`);
            for (const el of matrix) {
                console.log(el.join(`\t`))
            }
            break;
        }
    };

    function checker(matrix) {
        for (let i = 0; i < matrix.length; i++) { //row
            let y = matrix[i][0];

            if (y == matrix[i][1] && y == matrix[i][2] && y != false) {
                isWin = true;
                winner = y;
                break;
            }
        }

        for (let j = 0; j < matrix.length; j++) { //column
            let y = matrix[0][j];

            if (y == matrix[1][j] && y == matrix[2][j] && y != false) {
                isWin = true;
                winner = y;
                break;
            }
        }

        if (matrix[0][0] == matrix[1][1] && matrix[2][2] == matrix[1][1] && matrix[1][1] != false) {
            isWin = true;
            winner = matrix[0][0];
        } else if (matrix[0][2] == matrix[1][1] && matrix[2][0] == matrix[0][2] && matrix[1][1] != false) {
            isWin = true;
            winner = matrix[1][1];
        }
    }

    function fullChecker(matrix, i) {
        if (i > 8) {
            let isFull = (el) => el != false;
            if (matrix[0].concat(matrix[1], matrix[2]).every(isFull) == true) {
                checker(matrix);
                if (isWin) {
                    console.log(`Player ${winner} wins!`);
                    print();
                } else {
                    console.log("The game ended! Nobody wins :(");
                   print();
                }
            }
        }
    }
    
    function print() {
        for (const el of matrix) {
            console.log(el.join(`\t`));
        }
        isFullBool = true;
    }
}
// solve(["0 1",
//     "0 0",
//     "0 2",
//     "2 0",
//     "1 0",
//     "1 1",
//     "1 2",
//     "2 2",
//     "2 1",
//     "0 0"]);
// solve(["0 0",
// "0 0",
// "1 1",
// "0 1",
// "1 2",
// "0 2",
// "2 2",
// "1 2",
// "2 2",
// "2 1"]);
solve(["0 1",
    "0 0",
    "0 2",
    "2 0",
    "1 0",
    "1 2",
    "1 1",
    "2 1",
    "2 2",
    "0 0"]
)