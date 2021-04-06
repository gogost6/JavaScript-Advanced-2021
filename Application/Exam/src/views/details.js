import { html } from '../../node_modules/lit-html/lit-html.js';
import { getDetails, del } from '../api.js';

function detailsTemplate(data, onDelete) {
    return html`
    <section id="details-page" class="content details">
        <h1>${data.title}</h1>

        <div class="details-content">
            <strong>Published in category ${data.category}</strong>
            <p>${data.content}</p>

            <div class="buttons">
                ${data._ownerId == sessionStorage.getItem('userId') 
                    ? html`<a @click="${onDelete}" href="/home" class="btn delete">Delete</a>
                            <a href="/edit/${data._id}" class="btn edit">Edit</a>` 
                    : ''}
                <a href="/home" class="btn edit">Back</a>
            </div>
        </div>
    </section>
    `;
}

export async function detailsPage(ctx) {
    const data = await getDetails(ctx.params.id);
    ctx.render(detailsTemplate(data, onDelete));

    async function onDelete() {
        await del(ctx.params.id);
    }
}