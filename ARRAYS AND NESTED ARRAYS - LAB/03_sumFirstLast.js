function solve(arr) {
    arr = arr.map(Number);
    return arr[0] + arr[arr.length - 1];
}
console.log(solve(['20', '30', '40']));