import { html } from '../../node_modules/lit-html/lit-html.js';
import { memeDetails, del } from '../api.js';

function memeDetailsTemplate(data, onDelete) {
    return html`
    <section id="meme-details">
            <h1>Meme Title: ${data.title}</h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src="${data.imageUrl}">
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p> ${data.description} </p>

                    ${data._ownerId == sessionStorage.getItem('userId') 
                        ? html`<a class="button warning" href="/edit/${data._id}">Edit</a>
                            <button @click="${onDelete}" class="button danger">Delete</button>`
                        : '' }
                </div>
            </div>
        </section>
    `;
}

export async function detailsPage(ctx) {
    console.log('details-page created');
    const data = await memeDetails(ctx.params.id);
    ctx.render(memeDetailsTemplate(data, onDelete))

    async function onDelete() {
        if(confirm('Do you want to delete your post?')) {
            await del(ctx.params.id);
            ctx.page.redirect('/all-memes');
        } 
    }
}