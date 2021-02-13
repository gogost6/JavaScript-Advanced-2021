function solve(arr) {
    let obj = {};
    for (const el of arr) {
        let [car, model, q] = el.split(' | ');
        q = Number(q);
        if (!obj[car]) {
            obj[car] = { [model]: q };
        } else {
            if (!obj[car].hasOwnProperty(model)) {
                obj[car][model] = q;
            } else {
                obj[car][model] += q;
            }
        }
    }
    
    let result = Object.entries(obj).forEach(x => {
        console.log(`${x[0]}`);
        Object.entries(x[1]).forEach(z => {
            console.log(`###${z[0]} -> ${z[1]}`);
        })
    });
}
solve(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10']
);
