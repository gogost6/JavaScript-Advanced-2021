class ChristmasDinner {
    constructor(budget) {
        this.budget = budget;
        this.dishes = [];
        this.products = [];
        this.guests = {};
    }

    get budget() {
        return this._budget;
    }

    set budget(value) {
        if (value < 0) {
            throw new Error("The budget cannot be a negative number");
        }
        this._budget = value;
    }

    shopping([product, price]) {
        this._budget -= price
        if (this._budget < 0) {
            throw new Error("Not enough money to buy this product");
        } else {
            this.products.push(product);
            return `You have successfully bought ${product}!`;
        }
    }

    recipes(recipe) {
        let isTrue = true;
        recipe.productsList.forEach(x => {
            if (!this.products.includes(x)) {
                isTrue = false;
            }
        });

        if (isTrue) {
            this.dishes.push(recipe);
            return `${recipe.recipeName} has been successfully cooked!`
        } else {
            throw new Error("We do not have this product");
        }
    }

    inviteGuests(name, dish) {
        let isTrue = false;

        if(this.guests.hasOwnProperty(name)) {
            throw new Error("This guest has already been invited");
        }

        this.dishes.forEach(x => {
            if(Object.values(x)[0] == dish) {
                isTrue = true;
            }
        });
        
        if(isTrue) {
            this.guests[name] = dish;
            return `You have successfully invited ${name}!`;
        } else {
            throw new Error("We do not have this dish");
        }
    }

    showAttendance() {
        let result = [];
        Object.entries(this.guests).forEach(x => {
            const index = 0;
            for(let i = 0; i < this.dishes.length; i++) {
                if(Object.values(this.dishes[i])[0] == x[1]) {
                    let entries = Object.entries(this.dishes[i]);
                    let pr = entries[1][1].join(', ');
                    result.push(`${x[0]} will eat ${x[1]}, which consists of ${pr}`);
                }
            }
        });
        return result.join('\n');
    }
}

let dinner = new ChristmasDinner(300);

dinner.shopping(['Salt', 1]);
dinner.shopping(['Beans', 3]);
dinner.shopping(['Cabbage', 4]);
dinner.shopping(['Rice', 2]);
dinner.shopping(['Savory', 1]);
dinner.shopping(['Peppers', 1]);
dinner.shopping(['Fruits', 40]);
dinner.shopping(['Honey', 10]);

dinner.recipes({
    recipeName: 'Oshav',
    productsList: ['Fruits', 'Honey']
});
dinner.recipes({
    recipeName: 'Folded cabbage leaves filled with rice',
    productsList: ['Cabbage', 'Rice', 'Salt', 'Savory']
});
dinner.recipes({
    recipeName: 'Peppers filled with beans',
    productsList: ['Beans', 'Peppers', 'Salt']
});

dinner.inviteGuests('Ivan', 'Oshav');
dinner.inviteGuests('Petar', 'Folded cabbage leaves filled with rice');
dinner.inviteGuests('Georgi', 'Peppers filled with beans');

console.log(dinner.showAttendance());