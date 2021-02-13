function solve(arr) {
    let obj = {};
    let obtained = {};
    for (const el of arr) {
        let [key, value] = el.split(' => ');
        value = Number(value);
        if(!obj.hasOwnProperty(key)) {
            obj[key] = value;
        } else {
            obj[key] += value;
        }

        if(obj[key] >= 1000) {
            if(obtained[key]) { 
                obtained[key] += parseInt(obj[key] / 1000);
            }else { 
                obtained[key] = parseInt(obj[key] / 1000);
            }
            obj[key] = obj[key] % 1000;
        }
    }
    
    let result = Object.entries(obtained).forEach(element => {
        console.log(`${element[0]} => ${element[1]}`);
    });
}
// solve(['Orange => 2000',
//     'Peach => 1432',
//     'Banana => 450',
//     'Peach => 600',
//     'Strawberry => 549']
// )
solve(['Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789']
)