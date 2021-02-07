function solve() {
    function solution() {
        let microelements = {
            protein: 0,
            carbohydrate: 0,
            fat: 0,
            flavour: 0
        }

        let recipes = {
            apple: {
                carbohydrate: 1,
                flavour: 2
            },
            lemonade: {
                carbohydrate: 10,
                flavour: 20
            },
            burger: {
                carbohydrate: 5,
                fat: 7,
                flavour: 3
            },
            eggs: {
                protein: 5,
                fat: 1,
                flavour: 1
            },
            turkey: {
                protein: 10,
                carbohydrate: 10,
                fat: 10,
                flavour: 10
            }
        }

        function a() {
            let actions = {
                restock: ([a, q]) => {
                    q = Number(q);
                    microelements[a] += q;
                    return 'Success';
                },
                prepare: ([a, q]) => {
                    q = Number(q);
                    let entries = Object.entries(recipes[a]);
                    for (let i = 0; i < entries.length; i++) {
                        if (microelements[entries[i][0]] < entries[i][1] * q) {
                            return `Error: not enough ${entries[i][0]} in stock`;
                        } else {
                            microelements[entries[i][0]] -= entries[i][1] * q;
                            if (microelements[entries[i][0]] < 0) {
                                microelements[entries[i][0]] = 0;
                            }
                        }
                    }

                    return `Success`;
                },
                report: () => {
                    let r = [];
                    Object.entries(microelements).forEach(x => {
                        r.push(`${x[0]}=${x[1]}`);
                    })
                    return r.join(' ');
                }
            }

            return function (comand) {

                let token = comand;
                token = token.split(` `)
                let action = token.shift();

                if (action === `prepare`) {
                    return actions['prepare'](token);
                } else if (action === `restock`) {
                    return actions['restock'](token);
                } else if (action === `report`) {
                    return actions['report']();
                }
            }
        }
        return a();
    }
    let manager = solution();
    console.log(manager('restock carbohydrate 10'));
    console.log(manager('restock flavour 10'))
    console.log(manager('prepare apple 1'))
    console.log(manager('restock fat 10'))
    console.log(manager('prepare burger 1'))
    console.log(manager('report'))
}
solve();