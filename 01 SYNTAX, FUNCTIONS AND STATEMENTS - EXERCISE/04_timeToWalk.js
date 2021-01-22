<<<<<<< HEAD
function solve(a, b, c) {
    
    let distanceMeters = a * b;
    let speedMetersSec = c / 3.6;
    let time = distanceMeters / speedMetersSec;
    let rest = Math.floor(distanceMeters / 500);
  
    let timeMin = Math.floor(time / 60);
    let timeSec = Math.round(time - (timeMin * 60));
    let timeHr = Math.floor(time / 3600);
  
    console.log((timeHr < 10 ? "0" : "") + timeHr + ":" + (timeMin + rest < 10 ? "0" : "") + (timeMin + rest) + ":" + (timeSec < 10 ? "0" : "") + timeSec);

}
solve(4000, 0.60, 5);
=======
function solve(a, b, c) {
    
    let distanceMeters = a * b;
    let speedMetersSec = c / 3.6;
    let time = distanceMeters / speedMetersSec;
    let rest = Math.floor(distanceMeters / 500);
  
    let timeMin = Math.floor(time / 60);
    let timeSec = Math.round(time - (timeMin * 60));
    let timeHr = Math.floor(time / 3600);
  
    console.log((timeHr < 10 ? "0" : "") + timeHr + ":" + (timeMin + rest < 10 ? "0" : "") + (timeMin + rest) + ":" + (timeSec < 10 ? "0" : "") + timeSec);

}
solve(4000, 0.60, 5);
>>>>>>> 5447f1c2ff3ec88df240dbcc58ffdf349d219dbf
solve(2564, 0.70, 5.5)