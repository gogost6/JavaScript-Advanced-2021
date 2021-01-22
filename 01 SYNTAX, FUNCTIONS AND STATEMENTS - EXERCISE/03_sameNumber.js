<<<<<<< HEAD
function solve(a){
    a = String(a);
    let isTrue = true;
    for(let i = 0; i < a.length - 1; i++) {
        if(a[i] != a[i+1]) {
            isTrue = false;
            break;
        }
    }
    let n = 0;
    for (let i = 0; i < a.length; i++) {
        n += +a[i];
    }
    
    console.log(`${isTrue}\n${n}`)
}
solve(2222222);
=======
function solve(a){
    a = String(a);
    let isTrue = true;
    for(let i = 0; i < a.length - 1; i++) {
        if(a[i] != a[i+1]) {
            isTrue = false;
            break;
        }
    }
    let n = 0;
    for (let i = 0; i < a.length; i++) {
        n += +a[i];
    }
    
    console.log(`${isTrue}\n${n}`)
}
solve(2222222);
>>>>>>> 5447f1c2ff3ec88df240dbcc58ffdf349d219dbf
solve(1234);