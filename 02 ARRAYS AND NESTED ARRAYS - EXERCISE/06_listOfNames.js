function solve(arr) {
    let n = 1
    arr.sort((a,b) => a.localeCompare(b)).forEach(x => {
        console.log(`${n}.${x}`);
        n++;
    });
}
solve(["John", "Bob", "Christina", "Ema"]);