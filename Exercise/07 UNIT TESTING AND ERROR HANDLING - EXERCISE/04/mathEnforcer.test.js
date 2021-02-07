const expect = require('chai').expect;
const mathEnforcer = require('./mathEnforcer');

describe('mathEnforcer', () => {

    describe('addFive', () => {
        it('return undefined', () => {
            expect(mathEnforcer.addFive('a')).to.be.undefined;
        });

        it('adds properly', () => {
            expect(mathEnforcer.addFive(0)).to.equal(5);
            expect(mathEnforcer.addFive(-5)).to.equal(0);
            expect(mathEnforcer.addFive(5)).to.equal(10);
            expect(mathEnforcer.addFive(1.2)).to.equal(6.2);
            expect(mathEnforcer.addFive(-4.2)).to.be.closeTo(0.8, 0.7);
        });
    });

    describe('subtractTen', () => {
        it('return undefined', () => {
            expect(mathEnforcer.subtractTen('a')).to.be.undefined;
        });

        it('subtracts properly', () => {
            expect(mathEnforcer.subtractTen(0)).to.equal(-10);
            expect(mathEnforcer.subtractTen(10)).to.equal(0);
            expect(mathEnforcer.subtractTen(5)).to.equal(-5);
            expect(mathEnforcer.subtractTen(-1)).to.equal(-11);
            expect(mathEnforcer.subtractTen(-10)).to.equal(-20);
            expect(mathEnforcer.subtractTen(0.1)).to.equal(-9.9);
            expect(mathEnforcer.subtractTen(15.5)).to.equal(5.5);
            expect(mathEnforcer.subtractTen(2.5)).to.equal(-7.5);
        });
    });

    describe('sum', () => {
        it('return undefined', () => {
            expect(mathEnforcer.sum('a', 'a')).to.be.undefined;
            expect(mathEnforcer.sum('a', 1)).to.be.undefined;
            expect(mathEnforcer.sum(1, 'a')).to.be.undefined;
        });

        it('sums properly', () => {
            expect(mathEnforcer.sum(1, 1)).to.equal(2);
            expect(mathEnforcer.sum(10, 10)).to.equal(20);
            expect(mathEnforcer.sum(10, -20)).to.equal(-10);
            expect(mathEnforcer.sum(1, 2.5)).to.equal(3.5);
            expect(mathEnforcer.sum(-1.5, -2)).to.equal(-3.5);
            expect(mathEnforcer.sum(-1, -1)).to.equal(-2);
            expect(mathEnforcer.sum(-5, 7)).to.equal(2);
            expect(mathEnforcer.sum(-5, 7.5)).to.equal(2.5);
        })
    });
})