import { html } from '../../node_modules/lit-html/lit-html.js';
import { edit, getDetails } from '../api.js';

function editTemplate(data, onSubmit) {
    return html`
    <section id="edit-page" class="content">
        <h1>Edit Article</h1>

        <form @submit="${onSubmit}" id="edit" action="#" method="">
            <fieldset>
                <p class="field title">
                    <label for="title">Title:</label>
                    <input type="text" name="title" id="title" placeholder="Enter article title" value=${data.title}>
                </p>

                <p class="field category">
                    <label for="category">Category:</label>
                    <input type="text" name="category" id="category" placeholder="Enter article category" value="${data.category}">
                </p>
                <p class="field">
                    <label for="content">Content:</label>
                    <textarea name="content" id="content" .value="${data.content}"></textarea>
                </p>

                <p class="field submit">
                    <input class="btn submit" type="submit" value="Save Changes">
                </p>

            </fieldset>
        </form>
    </section>`;
}

export async function editPage(ctx) {
    const data = await getDetails(ctx.params.id);
    ctx.render(editTemplate(data, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const title = form.get('title');
        const category = form.get('category');
        const content = form.get('content');

        const arcticleObj = {title, category, content };
        
        if (title == '' || category == '' || content == '') {
            alert('Empty inputs!');
        } else if(category != 'JavaScript' && category != 'Java' && category != 'C#' && category != 'Python') {
            alert('Wrong category!');
        } else {
            await edit(ctx.params.id, arcticleObj);
            ctx.page.redirect(`/details/${ctx.params.id}`);
        }
    }
}