const { expect } = require('chai');
const isOddOrEven = require('./evenOrOdd');

describe('isOddOrEven', () => {
    it('returns odd', () => {
        expect(isOddOrEven('a')).to.equal('odd');
    });

    it('returns even', () => {
        expect(isOddOrEven('aa')).to.equal('even');
    })

    it('returns even', () => {
        expect(isOddOrEven('aaaaaa')).to.equal('even');
    })

    it('returns odd', () => {
        expect(isOddOrEven('aaaaa')).to.equal('odd');
    });

    it('returns undefined', () => {
        expect(isOddOrEven(1)).to.be.undefined;
    })

    it('returns undefined', () => {
        expect(isOddOrEven(NaN)).to.be.undefined;
    })

    it('returns undefined', () => {
        expect(isOddOrEven(undefined)).to.be.undefined;
    })

    it('returns undefined', () => {
        expect(isOddOrEven([])).to.be.undefined;
    })

    it('returns undefined', () => {
        expect(isOddOrEven({})).to.be.undefined;
    })
})