<<<<<<< HEAD
function solve(worker) {
    let composed = Object.assign({}, worker);
    if (composed.dizziness == true) {
        composed.levelOfHydrated += 0.1 * composed.weight * composed.experience;
        composed.dizziness = false;
    }
    return composed;
}

let worker = {
    weight: 80,
    experience: 1,
    levelOfHydrated: 0,
    dizziness: true
}

let result = solve(worker);
console.log(result);
=======
function solve(worker) {
    let composed = Object.assign({}, worker);
    if (composed.dizziness == true) {
        composed.levelOfHydrated += 0.1 * composed.weight * composed.experience;
        composed.dizziness = false;
    }
    return composed;
}

let worker = {
    weight: 80,
    experience: 1,
    levelOfHydrated: 0,
    dizziness: true
}

let result = solve(worker);
console.log(result);
>>>>>>> 5447f1c2ff3ec88df240dbcc58ffdf349d219dbf
