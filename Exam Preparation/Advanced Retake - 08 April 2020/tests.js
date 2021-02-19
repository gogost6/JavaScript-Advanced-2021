const { expect, assert } = require("chai");
let { Repository } = require("./solution.js");

describe('Tests …', () => {
    let properties = undefined
    let repository = undefined
    let entity = undefined
    beforeEach(() => {
        properties = {
            name: "string",
            age: "number",
            birthday: "object"
        };
        repository = new Repository(properties);
        entity = {
            name: 'Pesho',
            age: 22,
            birthday: new Date(1998, 0, 7)
        };
    })
    describe('input', () => {
        it('valid input', () => {
            expect(repository).to.have.property('props');
            expect(repository).to.have.property('data');
            expect(repository instanceof Repository).to.be.true;
        });
    });
    describe('add method', () => {
        it('valid input', () => {
            expect(repository.add(entity)).to.equal(0);
            expect(repository.count).to.equal(1);
            expect(repository.add(entity)).to.equal(1);
            expect(repository.count).to.equal(2);
            expect(repository.props).to.eql({
                name: 'string',
                age: 'number',
                birthday: 'object'
            });
        });
        it('invalid input', () => {
            let entity = {
                name: 33,
                age: 22,
                birthday: new Date(1998, 0, 7)
            };
            expect(() => {
                repository.add(entity)
            }).to.throw(`Property name is not of correct type!`);
            let entity2 = {
                name: 'Pesho',
                age: '22',
                birthday: new Date(1998, 0, 7)
            };
            expect(() => {
                repository.add(entity2)
            }).to.throw(`Property age is not of correct type!`);
            let entity3 = {
                name: 'Pesho',
                age: 22,
                birthday: (1998, 0, 7)
            };
            expect(() => {
                repository.add(entity3)
            }).to.throw(`Property birthday is not of correct type!`);
            let entity4 = {
                age: 22,
                birthday: new Date(1998, 0, 7)
            };
            expect(() => {
                repository.add(entity4)
            }).to.throw('Property name is missing from the entity!');
        });
    });
    describe('getID', () => {
        it('valid input test', () => {
            repository.add(entity);
            repository.add(entity);
            expect(repository.getId(0).name).to.equal('Pesho');
            expect(repository.getId(1).age).to.equal(22);
        });
        it('invalid input', () => {
            repository.add(entity);
            expect(() => {
                repository.getId(3)
            }).to.throw('Entity with id: 3 does not exist!');
            expect(() => {
                repository.getId(-1)
            }).to.throw('Entity with id: -1 does not exist!');
        });
    });
    describe('update', () => {
        it('valid input', () => {
            repository.add(entity);
            entity2 = {
                name: 'Gosho',
                age: 22,
                birthday: new Date(1998, 0, 7)
            };
            repository.update(0, entity2)
            expect(repository.getId(0).name).to.equal('Gosho');
        });
        it('invalid input', () => {
            repository.add(entity);
            entity2 = {
                name: 'Gosho',
                age: 22,
                birthday: new Date(1998, 0, 7)
            };
            expect(() => {
                repository.update(3, entity2)
            }).to.throw('Entity with id: 3 does not exist!');
            let entity3 = {
                name: 33,
                age: 22,
                birthday: new Date(1998, 0, 7)
            };
            expect(() => {
                repository.update(0, entity3)
            }).to.throw('Property name is not of correct type!');
            let entity4 = {
                age: 22,
                birthday: new Date(1998, 0, 7)
            };
            expect(() => {
                repository.update(0, entity4)
            }).to.throw('Property name is missing from the entity!');

        });
    });
    describe('del', () => {
        it('valid input', () => {
            repository.add(entity);
            repository.add(entity);
            repository.add(entity);
            expect(repository.count).to.equal(3);
            repository.del(1);
            expect(repository.count).to.equal(2);
            expect(repository.getId(0).name).to.equal('Pesho');
        });
        it('invalid input', () => {
            repository.add(entity);
            expect(() => {
                repository.del(3)
            }).to.throw('Entity with id: 3 does not exist!');
            expect(() => {
                repository.del(-2)
            }).to.throw('Entity with id: -2 does not exist!');
        });
    });
});