import { render } from '../../node_modules/lit-html/lit-html.js';
import { townsTemplate } from './townsTemplate.js';

document.getElementById('btnLoadTowns').addEventListener('click', function (e) {
    e.preventDefault();
    let towns = document.getElementById('towns').value.split(', ');

    const result = townsTemplate(towns);
    const container = document.getElementById('root');

    render(result, container);
})