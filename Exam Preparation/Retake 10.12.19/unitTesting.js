let dealership = {
    newCarCost: function (oldCarModel, newCarPrice) {

        let discountForOldCar = {
            'Audi A4 B8': 15000,
            'Audi A6 4K': 20000,
            'Audi A8 D5': 25000,
            'Audi TT 8J': 14000,
        }

        if (discountForOldCar.hasOwnProperty(oldCarModel)) {
            let discount = discountForOldCar[oldCarModel];
            let finalPrice = newCarPrice - discount;
            return finalPrice;
        } else {
            return newCarPrice;
        }
    },

    carEquipment: function (extrasArr, indexArr) {
        let selectedExtras = [];
        indexArr.forEach(i => {
            selectedExtras.push(extrasArr[i])
        });

        return selectedExtras;
    },

    euroCategory: function (category) {
        if (category >= 4) {
            let price = this.newCarCost('Audi A4 B8', 30000);
            let total = price - (price * 0.05)
            return `We have added 5% discount to the final price: ${total}.`;
        } else {
            return 'Your euro category is low, so there is no discount from the final price!';
        }
    }
}

const { expect } = require('chai');

describe("Tests …", function () {
    describe("returning old car", function () {
        it("price for old", function () {
            expect(dealership.newCarCost('Audi A3', 5000)).to.be.equal(5000);
            expect(dealership.newCarCost('Audi A3', 5000.50)).to.be.equal(5000.50);
            expect(dealership.newCarCost('Lada', 300)).to.be.equal(300);
            expect(dealership.newCarCost('Lada', 312.5)).to.be.equal(312.5);
        });
        it('prices for discount models', function () {
            expect(dealership.newCarCost('Audi A4 B8', 20000)).to.be.equal(5000);
            expect(dealership.newCarCost('Audi A4 B8', 21500.50)).to.be.equal(6500.5);
            expect(dealership.newCarCost('Audi A6 4K', 25000)).to.be.equal(5000);
            expect(dealership.newCarCost('Audi A8 D5', 30000)).to.be.equal(5000);
            expect(dealership.newCarCost('Audi TT 8J', 20000)).to.be.equal(6000);
        })
    });

    describe('extras', () => {
        it('test', () => {
            let selectedExtras = dealership.carEquipment(['heated seats', 'sliding roof', 'sport rims', 'navigation'], [0]);
            expect(selectedExtras).to.be.eql(['heated seats']);
            selectedExtras = dealership.carEquipment(['heated seats', 'sliding roof', 'sport rims', 'navigation'], [3]);
            expect(selectedExtras).to.be.eql(['navigation']);
            selectedExtras = dealership.carEquipment(['heated seats', 'sliding roof', 'sport rims', 'navigation'], [0, 3]);
            expect(selectedExtras).to.be.eql(['heated seats', 'navigation']);
        })
    })

    describe('euroCategory', () => {
        it('category over 4', () => {
            let price = dealership.newCarCost('Audi A4 B8', 30000);
            let total = price - (price * 0.05);
            expect(dealership.euroCategory(4)).to.be.equal(`We have added 5% discount to the final price: ${total}.`);
        })

        it('category under 4', () => {
            expect(dealership.euroCategory(3)).to.be.equal('Your euro category is low, so there is no discount from the final price!');
        })
    })
});
