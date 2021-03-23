import { html } from '../../node_modules/lit-html/lit-html.js';

const catsTemplate = (items) => {
    return html`
    <ul>${items.map(item => html`<li>
            <img src="./images/${item.imageLocation}.jpg" width="300" height="250" alt="Card image cap">
            <div class="info">
                <button @click=${onClick} class="showBtn">Show status code</button>
                <div class="status" style="display: none" id=${item.id}>
                    <h4>Status Code: ${item.statusCode}</h4>
                    <p>${item.statusMessage}</p>
                </div>
            </div>
        </li>`)}</ul>
    `;
}

function onClick(e) {
    e.preventDefault();

    const target = e.target.parentNode;
    if (target.querySelector('.status').style.display == 'block') {
        target.querySelector('.status').style.display = 'none'
        e.target.textContent = 'Show status code';
    } else {
        target.querySelector('.status').style.display = 'block';
        e.target.textContent = 'Hide status code';
    }
}

export { catsTemplate }