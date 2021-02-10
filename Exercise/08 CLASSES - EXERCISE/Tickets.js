function solve(arr, str) {
    let outputArr = [];
    arr.forEach(x => {
        let [destination, price, status] = x.split('|');
        class Ticket {
            constructor(destination, price, status) {
                Object.assign(this, { destination, price: Number(price), status });
            }
        }
        outputArr.push(new Ticket(destination, price, status));
    });
    let obj = {
        destination: () => {
            outputArr.sort((a, b) => a.destination.localeCompare(b.destination));
            return outputArr;
        },
        price: () => {
            outputArr.sort((a, b) => a.price - b.price);
            return outputArr;
        },
        status: () => {
            outputArr.sort((a, b) => a.status.localeCompare(b.status));
            return outputArr;
        }
    }
    return obj[str]();
}
console.log(solve(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'destination'))