<<<<<<< HEAD
function solve(input) {
    let obj = {};

    while (input.length) {
        let sale = input.shift()
        let [town, name, price] = sale.split(' | ');
        if (!obj[name]) {
            obj[name] = { town, price: Number(price) }
        } else {
            obj[name] = obj[name].price <= Number(price) ? obj[name] : {town, price: Number(price)}
        } 
    }
    let result = [];
    for (const key in obj) {
        result.push(`${key} -> ${obj[key].price} (${obj[key].town})`);
    }
    return result.join(`\n`)
}
console.log(solve(['Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
=======
function solve(input) {
    let obj = {};

    while (input.length) {
        let sale = input.shift()
        let [town, name, price] = sale.split(' | ');
        if (!obj[name]) {
            obj[name] = { town, price: Number(price) }
        } else {
            obj[name] = obj[name].price <= Number(price) ? obj[name] : {town, price: Number(price)}
        } 
    }
    let result = [];
    for (const key in obj) {
        result.push(`${key} -> ${obj[key].price} (${obj[key].town})`);
    }
    return result.join(`\n`)
}
console.log(solve(['Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
>>>>>>> 5447f1c2ff3ec88df240dbcc58ffdf349d219dbf
    'New York | Burger | 10']))