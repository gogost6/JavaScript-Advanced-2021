import { render } from '../../node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';
import { catsTemplate } from './card.js';

const result = catsTemplate(cats);
const container = document.getElementById('allCats');

render(result, container);

