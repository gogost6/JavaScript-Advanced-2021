function solve(arr, rotations) {
    for (let i = 0; i < rotations; i++) {
        let el = arr.pop();
        arr.unshift(el);
    }
    console.log(arr.join(' '));
}
// solve(['1', 
// '2', 
// '3', 
// '4'], 
// 2);
solve(['Banana', 
'Orange', 
'Coconut', 
'Apple'], 
15);