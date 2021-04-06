import { html } from '../../node_modules/lit-html/lit-html.js';
import { search } from '../api.js'

function searchTemplate(data, onSearch, title) {
    return html`
    <section id="search-page" class="content">
        <h1>Search</h1>
        <form id="search-form">
            <p class="field search">
                <input type="text" placeholder="Search by article title" name="search" id="search-value" .value="${title || []}">
            </p>
            <p class="field submit">
                <input @click="${onSearch}" class="btn submit" type="submit" value="Search">
            </p>
        </form>
        <div class="search-container">
            ${data.length > 0 
                ? data.map(article => html`<a class="article-preview" href="/details/${article._id}">
                            <article>
                                <h3>Topic: <span>${article.title}</span></h3>
                                <p>Category: <span>${article.category}</span></p>
                            </article>
                        </a>`) 
                : html`<h3 class="no-articles">No matching articles</h3>`}
        </div>
    </section>
    `;
}

export async function searchPage(ctx) {
    const title = ctx.querystring.split('=')[1] || [];
    console.log(title);
    const data = title != '' ? await search(title) : [];
    console.log(data);
    ctx.render(searchTemplate(data, onSearch, title));
    async function onSearch(e) {
        e.preventDefault();
        const query = document.getElementById('search-value').value;
        ctx.page.redirect('/search?query=' + query);
    }
}