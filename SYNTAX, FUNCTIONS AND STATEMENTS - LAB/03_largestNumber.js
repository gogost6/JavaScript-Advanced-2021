function solve(a, b, c) {
    let max = 0;
    a > b && a > c? max = a : b > a && b > c? max = b : max = c;
    console.log(`The largest number is ${max}.`);
}
solve(5, -3, 16);
solve(-3, -5, -22.5) 