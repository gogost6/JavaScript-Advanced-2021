function solve(arr) {
    let n = 0;
    for(let i = 0; i < arr.length; i++) {
        n += 1/arr[i];
    }
    console.log(`${arr.reduce((a,b) => a+b)}\n${n}\n${arr.join('')}`);
}
solve([1, 2, 3])