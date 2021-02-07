const { expect } = require('chai');
const lookupChar = require('./charLookUp');

describe('Char lookup', () => {
    it('returns undefined', () => {
        expect(lookupChar('a', 'w')).to.be.undefined;
        expect(lookupChar(1, 1)).to.be.undefined;
        expect(lookupChar(1, 'w')).to.be.undefined;
        expect(lookupChar('String', 1.2)).to.be.undefined;
    });

    it('returns incorrect index', () => {
        expect(lookupChar('ab', -1)).to.equal('Incorrect index');
        expect(lookupChar('ab', 2)).to.equal('Incorrect index');
    });

    it('returns b', () => {
        expect(lookupChar('ab', 1)).to.equal('b');
    });

    it('returns a', () => {
        expect(lookupChar('ab', 0)).to.equal('a');
    });

    it('returns t', () => {
        expect(lookupChar('My string', 4)).to.equal('t');
    });
})