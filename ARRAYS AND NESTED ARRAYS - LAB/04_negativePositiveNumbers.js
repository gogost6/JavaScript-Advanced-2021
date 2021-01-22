function solve(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] >= 0) {
            newArr.push(arr[i])
        } else {
            newArr.unshift(arr[i])
        }
    }
    newArr.forEach(x => {
        console.log(x);
    });
}
solve([7, -2, 8, 9]);
solve([3, -2, 0, -1]);