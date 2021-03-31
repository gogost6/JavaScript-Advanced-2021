import { html } from '../../node_modules/lit-html/lit-html.js';
import { create } from '../api.js';
import { notify } from '../notification.js';

function createTemplate(onSubmit) {
    return html`
        <section id="create-meme">
            <form @submit="${onSubmit}" id="create-form">
                <div class="container">
                    <h1>Create Meme</h1>
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                    <label for="imageUrl">Meme Image</label>
                    <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                    <input type="submit" class="registerbtn button" value="Create Meme">
                </div>
            </form>
        </section>
    `;
}


export async function createPage(ctx) {
    console.log('create-page created');
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const title = form.get('title');
        const description = form.get('description');
        const imageUrl = form.get('imageUrl');

        const memeObj = { title, description, imageUrl };
        try {
            if (title == '' || description == '' || imageUrl == '') {
                throw new Error('Empty inputs!');
            } else {
                await create(memeObj);
                ctx.page.redirect(`/all-memes`);
            }
        } catch (err) {
            notify(err.message)
        }
    }
}