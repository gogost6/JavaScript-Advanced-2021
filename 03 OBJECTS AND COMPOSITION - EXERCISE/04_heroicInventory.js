<<<<<<< HEAD
function solve(input) {
    let heroes = [];
    let data = input.map(x => x.split(' / ')).forEach(element => {
        element[2] = element[2] ? element[2].split(', ') : [];
        heroes.push({ name: element[0], level: Number(element[1]), items: element[2] });
    });
    return JSON.stringify(heroes);
}
console.log(solve(['Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara']
=======
function solve(input) {
    let heroes = [];
    let data = input.map(x => x.split(' / ')).forEach(element => {
        element[2] = element[2] ? element[2].split(', ') : [];
        heroes.push({ name: element[0], level: Number(element[1]), items: element[2] });
    });
    return JSON.stringify(heroes);
}
console.log(solve(['Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara']
>>>>>>> 5447f1c2ff3ec88df240dbcc58ffdf349d219dbf
))