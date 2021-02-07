<<<<<<< HEAD
function solve(input) {
    let dictionary = {};
    while (input.length) {
        let [a, b] = input.shift().split(' : ');
        let capital = a[0];

        if (!dictionary[capital]) {
            dictionary[capital] = [];
        }
        dictionary[capital].push({ name: a, price: b });
    }

    let result = [];
    Object.entries(dictionary).sort((a, b) => a[0].localeCompare(b[0])).forEach(entry => {
        let string = `${entry[0]}\n${entry[1].sort((a, b) => a.name.localeCompare(b.name)).map(product => `  ${product.name}: ${product.price}`).join(`\n`)}`
        result.push(string)
    });

    return result.join(`\n`);
}
console.log(solve(['Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
=======
function solve(input) {
    let dictionary = {};
    while (input.length) {
        let [a, b] = input.shift().split(' : ');
        let capital = a[0];

        if (!dictionary[capital]) {
            dictionary[capital] = [];
        }
        dictionary[capital].push({ name: a, price: b });
    }

    let result = [];
    Object.entries(dictionary).sort((a, b) => a[0].localeCompare(b[0])).forEach(entry => {
        let string = `${entry[0]}\n${entry[1].sort((a, b) => a.name.localeCompare(b.name)).map(product => `  ${product.name}: ${product.price}`).join(`\n`)}`
        result.push(string)
    });

    return result.join(`\n`);
}
console.log(solve(['Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
>>>>>>> 5447f1c2ff3ec88df240dbcc58ffdf349d219dbf
    'T-Shirt : 10']));