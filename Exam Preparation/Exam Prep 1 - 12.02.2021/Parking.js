class Parking {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
        // this.payed = false;
    }

    addCar(carModel, carNumber) {
        if(this.capacity > 0) {
            this.capacity -= 1;
            this.vehicles.push({carModel:carModel, carNumber:carNumber, payed: false});
            return `The ${carModel}, with a registration number ${carNumber}, parked.`
        } else {
            throw new Error("Not enough parking space.");
        }
    }

    removeCar(carNumber) {
        let parked = this.vehicles.find(x => x['carNumber'] == carNumber);
        if(parked === undefined) {
            throw new Error("The car, you're looking for, is not found.");
        } else if(parked['payed'] == false) {
            throw new Error(`${parked['carNumber']} needs to pay before leaving the parking lot.`)
        } else {
            this.capacity += 1;
            return `${parked['carNumber']} left the parking lot.`
        }
    }

    pay(carNumber) {
        let parked = this.vehicles.find(x => x['carNumber'] == carNumber);

        if(parked == undefined) {
            throw new Error(`${carNumber} is not in the parking lot.`)
        } else if(parked['payed'] == true) {
            throw new Error(`${carNumber}'s driver has already payed his ticket.`)
        } else {
            parked['payed'] = true;
            return `${carNumber}'s driver successfully payed for his stay.`;
        }
    }

    getStatistics(carNumber) {
        let parked = this.vehicles.find(x => x['carNumber'] == carNumber);
        let result = [];
        if(carNumber == undefined) {
            result.push(`The Parking Lot has ${this.capacity} empty spots left.`);
            this.vehicles.forEach(car => {
                result.push(`${car['carModel']} == ${car['carNumber']} - ${car['payed'] == false ? 'Not payed' : 'Has Payed'}`);
            })
            return result.join('\n');
        } else {
            result.push((`${parked['carModel']} == ${parked['carNumber']} - ${parked['payed'] == false ? 'Not payed' : 'Has Payed'}`));
            return result.join('\n');
        }
    }
}

const parking = new Parking(12);

console.log(parking.addCar("Volvo t600", "TX3691CA"));
console.log(parking.getStatistics());

console.log(parking.pay("TX3691CA"));
console.log(parking.removeCar("TX3691CA"));
