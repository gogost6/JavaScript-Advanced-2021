import { html } from '../../node_modules/lit-html/lit-html.js';
import { create } from '../api.js';

function createTemplate(onSubmit) {
    return html`
    <section id="create-page" class="content">
        <h1>Create Article</h1>

        <form @submit="${onSubmit}" id="create" action="#" method="">
            <fieldset>
                <p class="field title">
                    <label for="create-title">Title:</label>
                    <input type="text" id="create-title" name="title" placeholder="Enter article title">
                </p>

                <p class="field category">
                    <label for="create-category">Category:</label>
                    <input type="text" id="create-category" name="category" placeholder="Enter article category">
                </p>
                <p class="field">
                    <label for="create-content">Content:</label>
                    <textarea name="content" id="create-content"></textarea>
                </p>

                <p class="field submit">
                    <input class="btn submit" type="submit" value="Create">
                </p>

            </fieldset>
        </form>
    </section>
    `;
}

export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

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
            await create(arcticleObj);
            ctx.page.redirect(`/home`);
        }
    }
}