import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';
import { townsTemplate } from './card.js';

const container = document.getElementById('towns');
const result = townsTemplate(towns);

render(result, container);

document.getElementById('searchBtn').addEventListener('click', function (e) {
    e.preventDefault();
    
    const li = document.querySelectorAll('li');
    Array.from(li).forEach(x => x.className = '');

    if(document.getElementById('searchText').value != '') {
        let counter = 0;
        Array.from(li).forEach(x => {
            if(x.textContent.includes(document.getElementById('searchText').value)) {
                counter++;
                x.className = 'active';
            }
        })

        if(counter > 0) {
            const paragraph = html`${counter} matches found`;
            render(paragraph, document.querySelector('p'));
        } else {
            const zeroMatches = html`No matches found`;
            render(zeroMatches, document.querySelector('p'));
        }
    } else {
        document.querySelector('p').textContent = 'Input empty!'
    }
});

