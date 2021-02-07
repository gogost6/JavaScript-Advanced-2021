function solve(a, b) {
    a = Number(a);
    b = Number(b);
    let sum = 0;
    if(a > b) {
        for(let i = b; i <= a; i++) {
            sum += i;
        }
    } else {
        for(let i = a; i <= b; i++) {
            sum += i;
        }
    }
    console.log(sum);
}
solve('1', '5');
solve('-8', '20');