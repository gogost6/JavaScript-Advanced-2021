function solve(arr) {
    const obj = {};
    for (let i = 0; i < arr.length; i += 2) {
        const name = arr[i];
        const calories = arr[i+1];

        obj[name] = Number(calories);
    }

    console.log(obj);
}
solve(['Yoghurt', '48', 'Rise', '138', 'Apple', '52'])
