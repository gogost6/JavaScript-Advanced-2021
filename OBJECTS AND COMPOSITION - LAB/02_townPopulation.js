function solve(arr) {
    let obj = {};
    arr.forEach(x => {
        let [city, population] = x.split(' <-> ');
        population = Number(population);
        
        obj[city] == undefined ? obj[city] = population : obj[city] += population;
    });
    for (const [k,v] of Object.entries(obj)) {
        console.log(`${k} : ${v}`);
    }
}
solve(['Sofia <-> 1200000',
'Montana <-> 20000',
'New York <-> 10000000',
'Washington <-> 2345000',
'Las Vegas <-> 1000000']
)