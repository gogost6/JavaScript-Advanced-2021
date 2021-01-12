function solve(str) {
    let splited = str.split(/[, ]+/g);
    let result = [];
    for (const el of splited) {
        let regex = /[\w]+/g;
        let found = el.match(regex);
        if(found.length == 1) {
            result.push(found[0].toUpperCase());
        } else {
            result.push(found[0].toUpperCase());
            result.push(found[1].toUpperCase());
        }
    }
    console.log(result.join(', '));
}
//solve('Hi, how are you?');
solve('Functions in JS can be nested, i.e. hold other functions')