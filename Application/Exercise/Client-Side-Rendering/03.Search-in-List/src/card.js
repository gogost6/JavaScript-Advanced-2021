import { html } from '../../node_modules/lit-html/lit-html.js';

const townsTemplate = (data) => {
    return html`
        <ul>${data.map((town) => html`<li>${town}</li>`)}</ul>
    `;
}

export { townsTemplate };