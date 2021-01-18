function solve(arr) {
    let num = 1;
    let newArr = [];
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] == 'add') {
            newArr.push(num);
        } else if(arr[i] == 'remove') {
            newArr.pop();
        }
        num++;
    }
    console.log(newArr.length > 0? newArr.join(`\n`) : 'Empty')
}
solve(['add', 
'add', 
'add', 
'add']);
solve(['add', 
'add', 
'remove', 
'add', 
'add']);
solve(['remove', 
'remove', 
'remove']);