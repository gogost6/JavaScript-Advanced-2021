function solve(str) {
    str == 'Monday'? console.log(1): 
    str == 'Tuesday'? console.log(2):
    str == 'Wednesday'? console.log(3):
    str == 'Thursday'? console.log(4):
    str == 'Friday'? console.log(5):
    str == 'Saturday'? console.log(6):
    str == 'Sunday'? console.log(7):
    console.log('error');
}
solve('Monday');
solve('Friday');
solve("sdasd")