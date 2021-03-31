import { html } from '../../node_modules/lit-html/lit-html.js';
import { userMemes } from '../api.js';

async function userTemplate() {
    const email = sessionStorage.getItem('email');
    const username = sessionStorage.getItem('username');
    const gender = sessionStorage.getItem('gender');
    const data = await userMemes();

    return html`
    <section id="user-profile-page" class="user-profile">
            <article class="user-info">
                ${gender == 'male' 
                    ? html`<img id="user-avatar-url" alt="user-profile" src="/images/male.png">` 
                    : html`<img id="user-avatar-url" alt="user-profile" src="/images/female.png">`}
                <div class="user-content">
                    <p>Username: ${username}</p>
                    <p>Email: ${email}</p>
                    <p>My memes count: ${data.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
                ${data.length != 0 
                    ? data.map(meme => html`<div class="user-meme">
                                <p class="user-meme-title">${meme.title}</p>
                                <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
                                <a class="button" href="/details/${meme._id}">Details</a>
                            </div>`)  
                    : html`<p class="no-memes">No memes in database.</p>`} 
            </div>
        </section>
    `;
}

export async function userPage(ctx) {
    ctx.render(await userTemplate())
}