function solve(km, area) {
    let obj = {
        'motorway': 130,
        'interstate': 90,
        'city': 50,
        'residential': 20
    }
    if(obj[area] >= km) {
        console.log(`Driving ${km} km/h in a ${obj[area]} zone`);
    } else if(obj[area] <= km && (km - obj[area]) <= 20) {
        console.log(`The speed is ${km - obj[area]} km/h faster than the allowed speed of ${obj[area]} - speeding`);
    } else if(obj[area] <= km && (km - obj[area]) <= 40) {
        console.log(`The speed is ${km - obj[area]} km/h faster than the allowed speed of ${obj[area]} - excessive speeding`);
    } else {
        console.log(`The speed is ${km - obj[area]} km/h faster than the allowed speed of ${obj[area]} - reckless driving`);
    }
}
solve(40, 'city');
solve(21, 'residential');
solve(120, 'interstate');
solve(200, 'motorway');