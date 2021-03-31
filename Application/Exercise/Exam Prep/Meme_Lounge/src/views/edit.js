import { html } from '../../node_modules/lit-html/lit-html.js';
import { edit, memeDetails } from '../api.js';
import { notify } from '../notification.js';

function editTemplate(data, onSubmit) {
    return html`
    <section @submit="${onSubmit}" id="edit-meme">
            <form id="edit-form">
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" value="${data.title}">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description">
                            ${data.description} 
                        </textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value="${data.imageUrl}">
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>
    `;
}


export async function editPage(ctx) {
    console.log('edit-page created');
    const data = await memeDetails(ctx.params.id);
    ctx.render(editTemplate(data, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const title = form.get('title');
        const description = form.get('description');
        const imageUrl = form.get('imageUrl');
        
        const memeObj = {title, description, imageUrl};

        try {
            if (title == '' || description == '' || imageUrl == '') {
                throw new Error('Empty inputs!');
            } else {
                await edit(ctx.params.id, memeObj);
                ctx.page.redirect(`/details/${ctx.params.id}`);
            }
        } catch (err) {
            notify(err.message)
        }
       
    }
}