import page from '../../node_modules/page/page.mjs';
import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllMemes } from '../api.js';

function allMemesTemplate(data) {
    return html`
        <section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
                ${data != null 
                    ? data.map(meme => html`<div class="meme">
                                <div class="card">
                                    <div class="info">
                                        <p class="meme-title">${meme.title}</p>
                                        <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
                                    </div>
                                    <div id="data-buttons">
                                        <a class="button" href="/details/${meme._id}">Details</a>
                                    </div>
                                </div>
                            </div>`) 
                    : html`<p class="no-memes">No memes in database.</p>`}
			</div>
        </section>
    `;
}

export async function allMemesPage(ctx) {
    const data = await getAllMemes();
    console.log(data);
    ctx.render(allMemesTemplate(data))
}