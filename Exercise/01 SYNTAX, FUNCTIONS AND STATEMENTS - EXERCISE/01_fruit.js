function solve(a,b,c) {
    console.log(`I need $${((b/1000)*c).toFixed(2)} to buy ${(b/1000).toFixed(2)} kilograms ${a}.`);
}
solve('orange', 2500, 1.80);
solve('apple', 1563, 2.35)
