let pizzUni = {
    makeAnOrder: function (obj) {

        if (!obj.orderedPizza) {
            throw new Error('You must order at least 1 Pizza to finish the order.');
        } else {
            let result = `You just ordered ${obj.orderedPizza}`
            if (obj.orderedDrink) {
                result += ` and ${obj.orderedDrink}.`
            }
            return result;
        }
    },

    getRemainingWork: function (statusArr) {

        const remainingArr = statusArr.filter(s => s.status != 'ready');

        if (remainingArr.length > 0) {

            let pizzaNames = remainingArr.map(p => p.pizzaName).join(', ')
            let pizzasLeft = `The following pizzas are still preparing: ${pizzaNames}.`

            return pizzasLeft;
        } else {
            return 'All orders are complete!'
        }

    },

    orderType: function (totalSum, typeOfOrder) {
        if (typeOfOrder === 'Carry Out') {
            totalSum -= totalSum * 0.1;

            return totalSum;
        } else if (typeOfOrder === 'Delivery') {

            return totalSum;
        }
    }
}

const { expect, assert } = require('chai');

describe('Tests...', function () {
    it('ordering pizza', function () {
        expect(pizzUni.makeAnOrder({orderedPizza: 'peperoni', orderedDrink: 'coffee'})).to.be.eql(`You just ordered peperoni and coffee.`);
        expect((()=>{pizzUni.makeAnOrder({orderedDrink: 'coffee'})}).to.throw(new Error('You must order at least 1 Pizza to finish the order.')))
        // assert.throw(() => pizzUni.makeAnOrder({orderedDrink: 'coffee'}), 'You must order at least 1 Pizza to finish the order.');
        // assert.throw(() => pizzUni.makeAnOrder({orderedPizza: '', orderedDrink: 'coffee'}), 'You must order at least 1 Pizza to finish the order.');
    })

    it('ready or remaining', function() {
        expect(pizzUni.getRemainingWork([{pizzaName: 'peperoni', status: 'ready' }])).to.be.eql('All orders are complete!');
        expect(pizzUni.getRemainingWork([{pizzaName: 'peperoni', status: 'preparing' }])).to.be.eql(`The following pizzas are still preparing: peperoni.`);
        expect(pizzUni.getRemainingWork([{pizzaName: 'peperoni', status: 'preparing' }, {pizzaName: 'masterBurger', status: 'preparing' },])).to.be.eql(`The following pizzas are still preparing: peperoni, masterBurger.`);
    })

    it('carryout or delivery', function() {
        expect(pizzUni.orderType(100, 'Carry Out')).to.be.equal(90);
        expect(pizzUni.orderType(125.5, 'Carry Out')).to.be.equal(112.95);
        expect(pizzUni.orderType(100, 'Delivery')).to.be.equal(100);
        expect(pizzUni.orderType(100.25, 'Delivery')).to.be.equal(100.25);
    })
})