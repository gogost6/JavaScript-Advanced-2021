function solve(n,a,b,c,d,e) {
    n = Number(n);
    let arr = [a,b,c,d,e];
    let result = n;
    let obj = {
        chop(n) {
            result = n / 2;
            return result;
        },
        dice(n) {
            result = Math.sqrt(n);
            return result;
        },
        spice(n) {
            result = n+1;
            return result;
        },
        bake(n) {
            result = n * 3;
            return result;
        },
        fillet(n) {
            result = n * 0.8;
            return result;
        }
    }
    for (const el of arr) {
        obj[el](result);
        console.log(result);
    }
}
solve('32', 'chop', 'chop', 'chop', 'chop', 'chop');
solve('9', 'dice', 'spice', 'chop', 'bake', 'fillet');