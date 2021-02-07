function solve() {
    return {
        hasClima: function (vehicle) {
            vehicle.temp = 21;
            vehicle.tempSettings = 21;
            vehicle.adjustTemp = function () {
                this.temp < this.tempSettings ? this.temp++ : this.temp--;
            };
        },
        hasAudio: function (vehicle) {
            vehicle.currentTrack = { name: null, artist: null };
            vehicle.nowPlaying = function () {
                console.log(`Now playing '${this.currentTrack.name}' by ${this.currentTrack.artist}`);
            }
        },
        hasParktronic: function (vehicle) {
            vehicle.checkDistance = function (distance) {
                let message = [];
                if (distance < 0.1) {
                    message = "Beep! Beep! Beep!";
                } else if (distance < 0.25) {
                    message = "Beep! Beep!";
                } else if (distance < 0.5) {
                    message = "Beep!";
                } else {
                    message = "";
                }
                console.log(message);
            };
        }
    };
}

const assemblyLine = solve();

const myCar = {
    make: 'Toyota',
    model: 'Avensis'
};

assemblyLine.hasClima(myCar);
console.log(myCar.temp);
myCar.tempSettings = 18;
myCar.adjustTemp();
console.log(myCar.temp);

assemblyLine.hasAudio(myCar);
myCar.currentTrack = {
    name: 'Never Gonna Give You Up',
    artist: 'Rick Astley'
};
myCar.nowPlaying();


assemblyLine.hasParktronic(myCar);
myCar.checkDistance(0.4);
myCar.checkDistance(0.2);

console.log(myCar);













