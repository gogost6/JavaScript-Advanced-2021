const {expect, assert} = require('chai');
const numberOperations = require('./03. Number Operations_Resources');
describe("Tests …", function() {
    describe("powNumber", function() {
        it("works", function() {
            expect(numberOperations.powNumber(2)).to.be.equal(4);
            expect(numberOperations.powNumber(4)).to.be.equal(16);
            expect(numberOperations.powNumber(10)).to.be.equal(100);
        });
     });
     describe('number Checker', function() {
         it('errors', function() {
             assert.throw(() => numberOperations.numberChecker('es'), 'The input is not a number!');
             assert.throw(() => numberOperations.numberChecker('a'), 'The input is not a number!');
             assert.throw(() => numberOperations.numberChecker('WE'), 'The input is not a number!');
             assert.throw(() => numberOperations.numberChecker('A'), 'The input is not a number!');
             expect(numberOperations.numberChecker(2)).to.be.equal('The number is lower than 100!');
             expect(numberOperations.numberChecker(99)).to.be.equal('The number is lower than 100!');
             expect(numberOperations.numberChecker(100)).to.be.equal('The number is greater or equal to 100!');
             expect(numberOperations.numberChecker(1020)).to.be.equal('The number is greater or equal to 100!');
         })
     })
     
     describe('sumArrays', function() {
         it('works', function() {
             expect(numberOperations.sumArrays([1,2,3] , [1,2,3,4])).to.deep.equal([2, 4, 6, 4]);
             expect(numberOperations.sumArrays([1.5,2.2,3] , [1,2,3.4,4])).to.deep.equal([2.5, 4.2, 6.4, 4]);
         })
     })
});