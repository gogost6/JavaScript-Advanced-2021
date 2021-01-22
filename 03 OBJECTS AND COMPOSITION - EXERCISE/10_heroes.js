function solve() {
    return {
        canCast: function (state) {
            return {
                cast: function(spell) {
                    console.log(`${state.name} cast ${spell}`);
                    state.mana--;
                }
            }
        },
        canFight: function(state) {
            return {
                fight: function () {
                    console.log(`${state.name} slashes at the foe!`);
                    state.stamina--;
                }
            }
        },
        mage: function (name) {
            let state = {
                name,
                health: 100,
                mana: 100
            }
            return Object.assign(state, this.canCast(state))
        },
        fighter: function (name) {
            let state = {
                name,
                health: 100,
                stamina: 100
            }
            return Object.assign(state, this.canFight(state))
        }
    }
}

let create = solve();
const scorcher = create.mage("Scorcher");
scorcher.cast("fireball")
scorcher.cast("thunder")
scorcher.cast("light")

const scorcher2 = create.fighter("Scorcher 2");
scorcher2.fight()

console.log(scorcher2.stamina);
console.log(scorcher.mana);
