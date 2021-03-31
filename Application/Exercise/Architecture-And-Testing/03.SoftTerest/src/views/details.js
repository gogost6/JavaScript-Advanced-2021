import { html } from '../../node_modules/lit-html/lit-html.js';
import * as api from '../api/api.js';

function detailsTemplate(data, onLogout, onDelete) {
    const user = sessionStorage.getItem('userId');
    
    return html`    
        <img class="det-img" src="${data.img}" />
        <div class="desc">
            <h2 class="display-5">${data.title}</h2>
            <p class="infoType">Description:</p>
            <p class="idea-description">${data.description}</p>
        </div>
        ${user == data._ownerId 
                ? html`<div class="text-center">
                            <a @click = "${onDelete}" class="btn detb">Delete</a>
                        </div>` 
                : ''}`
}

export async function detailsPage(ctx) {
    console.log('details page created');
    const data = await api.getDetails(ctx.params.id);
    ctx.render(detailsTemplate(data, onLogout, onDelete));

    async function onLogout() {
        if(confirm('Do you want to logout?')) {
            await api.logout();
            ctx.page.redirect('/home');
        }
    }

    async function onDelete() {
        if(confirm('Do you want to delete your post?')) {
            await api.del(ctx.params.id);
            ctx.page.redirect('/home');
        } 
    }
}