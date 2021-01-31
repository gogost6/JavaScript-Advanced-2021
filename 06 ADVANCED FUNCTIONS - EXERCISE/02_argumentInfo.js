function solve(...arguments) {
    let obj = {};
    arguments.forEach(x => {
        let type = typeof x;
        if (!obj[type]) {
            obj[type] = [];
            obj[type].push(x);
        } else {
            obj[type].push(x);
        }
        console.log(`${type}: ${x}`);
    })
    Object.entries(obj).sort((a, b) => b[1].length - a[1].length).forEach(x => {
        console.log(`${x[0]} = ${x[1].length}`);
    })
}
solve({ name: 'bob' }, 3.333, 9.999)
solve('cat', 42, function () { console.log('Hello world!'); })