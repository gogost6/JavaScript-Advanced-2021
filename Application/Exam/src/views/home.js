import { html } from '../../node_modules/lit-html/lit-html.js';
import { getHome } from '../api.js'

function homeTemplate(data) {
    const js = Object.values(data).find(x => x.category == 'JavaScript');
    const csharp = Object.values(data).find(x => x.category == 'C#');
    const java = Object.values(data).find(x => x.category == 'Java');
    const python = Object.values(data).find(x => x.category == 'Python');

    return html`
    <section id="home-page" class="content">
        <h1>Recent Articles</h1>
        <section class="recent js">
            ${js != undefined ? html`<h2>JavaScript</h2>
            <article>
                <h3>${js.title}</h3>
                <p>${js.content}</p>
                <a href="/details/${js._id}" class="btn details-btn">Details</a>
            </article>` : html`<h2>JavaScript</h2>
                <h3 class="no-articles">No articles yet</h3>`}
            
        </section>
        <section class="recent csharp">
            ${csharp != undefined ? html`<h2>C#</h2>
            <article>
                <h3>${csharp.title}</h3>
                <p>${csharp.content}</p>
                <a href="/details/${csharp._id}" class="btn details-btn">Details</a>
            </article>` : html`<h2>C#</h2>
                <h3 class="no-articles">No articles yet</h3>`}
            
        </section>
        <section class="recent java">
        ${java != undefined ? html`<h2>Java</h2>
            <article>
                <h3>${java.title}</h3>
                <p>${java.content}</p>
                <a href="/details/${java._id}" class="btn details-btn">Details</a>
            </article>` : html`<h2>Java</h2>
                <h3 class="no-articles">No articles yet</h3>`}
        </section>
        <section class="recent python">
        ${python != undefined ? html`<h2>Python</h2>
            <article>
                <h3>${python.title}</h3>
                <p>${python.content}</p>
                <a href="/details/${python._id}" class="btn details-btn">Details</a>
            </article>` 
            : html`<h2>Python</h2>
                <h3 class="no-articles">No articles yet</h3>`}
        </section>
    </section>`;
}

export async function homePage(ctx) {
    const data = await getHome();
    ctx.render(homeTemplate(data))
}