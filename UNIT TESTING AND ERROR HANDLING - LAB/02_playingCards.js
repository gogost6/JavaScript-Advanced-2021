function solve(face, suit) {
    const validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    const utfCodes = {
        'S': '\u2660',
        'H': '\u2665',
        'D': '\u2666',
        'C': '\u2663'
    }

    if (validFaces.includes(face) == false) {
        throw new Error('Invalid face');
    } else if (Object.keys(utfCodes).includes(suit) == false) {
        throw new Error('Invalid suit')
    }

    return {
        face,
        suit,
        toString() {
            return `${face}${utfCodes[suit]}`
        }
    }
}

const myCard = solve('A', 'S');
console.log(myCard.toString());