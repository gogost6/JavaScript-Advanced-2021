import { html } from '../../node_modules/lit-html/lit-html.js';
import { get } from '../api.js'
function catalogueTemplate(data) {
    return html`
    <section id="catalog-page" class="content catalogue">
        <h1>All Articles</h1>
        ${data.length > 0 ? data.map(x => html`
        <a class="article-preview" href="/details/${x._id}">
            <article>
                <h3>Topic: <span>${x.title}</span></h3>
                <p>Category: <span>${x.category}</span></p>
            </article>
        </a>`) : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>`;
}

export async function cataloguePage(ctx) {
    const data = await get();
    ctx.render(catalogueTemplate(data))
}