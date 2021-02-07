<<<<<<< HEAD
function solve(arr) {
    const obj = {};
    for (let i = 0; i < arr.length; i += 2) {
        const name = arr[i];
        const calories = arr[i+1];

        obj[name] = Number(calories);
    }

    console.log(obj);
}
=======
function solve(arr) {
    const obj = {};
    for (let i = 0; i < arr.length; i += 2) {
        const name = arr[i];
        const calories = arr[i+1];

        obj[name] = Number(calories);
    }

    console.log(obj);
}
>>>>>>> 5447f1c2ff3ec88df240dbcc58ffdf349d219dbf
solve(['Yoghurt', '48', 'Rise', '138', 'Apple', '52'])