class Bank {
    constructor(bankName) {
        this._bankName = bankName;
        this.allCustomers = [];
    }

    newCustomer(customer) {
        if(this.allCustomers.some(x => x['personalId'] == customer['personalId'])) {
            throw new Error(`${customer['firstName']} ${customer['lastName']} is already our customer!`)
        } else {
            this.allCustomers.push(customer);
        }

        return customer;
    } 

    depositMoney(personalId, amount) {
        let found = this.allCustomers.find(x => x['personalId'] == personalId);
        if(found == undefined) {
            throw new Error(`We have no customer with this ID!`);
        } else {

            if(!found['totalMoney']) {
                found['totalMoney'] = 0;
                found['totalMoney'] += amount;
            } else {
                found['totalMoney'] += amount;
            }

            if(!found['counter']) {
                found['counter'] = 1;
            } 

            if(!found['transactions']) {
                found['transactions'] = [];
                found['transactions'].push(`${found['counter']}. ${found['firstName']} ${found['lastName']} made deposit of ${amount}$!`);
                found['counter']++;
            } else {
                found['transactions'].push(`${found['counter']}. ${found['firstName']} ${found['lastName']} made deposit of ${amount}$!`);
                found['counter']++;
            }

            return `${found['totalMoney']}$`
        }
    }

    withdrawMoney(personalId, amount) {
        let found = this.allCustomers.find(x => x['personalId'] == personalId);
        if(found == undefined) {
            throw new Error(`We have no customer with this ID!`);
        } else if(found['totalMoney'] < amount) {
            throw new Error(`${found['firstName']} ${found['lastName']} does not have enough money to withdraw that amount!`);
        } else {
            found['totalMoney'] -= amount;
            found['transactions'].push(`${found['counter']}. ${found['firstName']} ${found['lastName']} withdrew ${amount}$!`);
            found['counter']++;
            return `${found['totalMoney']}$`;
        }
    }

    customerInfo(personalId) {
        let found = this.allCustomers.find(x => x['personalId'] == personalId);
        if(found == undefined) {
            throw new Error(`We have no customer with this ID!`);
        } else {
            const bank = `Bank name: ${this._bankName}`;
            const customerName = `Customer name: ${found['firstName']} ${found['lastName']}`;
            const cId = `Customer ID: ${found['personalId']}`;
            const total = `Total Money: ${found['totalMoney']}$`;
            let transactions = found['transactions'].reverse().join('\n');
            let result = [bank, customerName, cId, total];
            return `${result.join('\n')}\nTransactions:\n${transactions}`;
        }
    }
}

let bank = new Bank('SoftUni Bank');

console.log(bank.newCustomer({firstName: 'Svetlin', lastName: 'Nakov', personalId: 6233267}));
console.log(bank.newCustomer({firstName: 'Mihaela', lastName: 'Mileva', personalId: 4151596}));

console.log(bank.depositMoney(6233267, 250));
console.log(bank.depositMoney(6233267, 250));

console.log(bank.withdrawMoney(6233267, 125));

console.log(bank.customerInfo(6233267));

