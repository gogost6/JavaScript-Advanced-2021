import { html } from '../../node_modules/lit-html/lit-html.js'
import { get, logout } from '../api/api.js'

function dashboardTemplate(data) {
    return html`
    <div id="dashboard-holder">
        ${data.length == 0 
            ? html`<h1>No ideas yet! Be the first one :)</h1>` 
            : data.map(item => ideasTemplate(item))}
    </div>`
}

function ideasTemplate(item) {
    return html`<div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
    <div class="card-body">
        <p class="card-text">${item.title}</p>
    </div>
    <img class="card-image" src="${item.img}" alt="Card image cap">
    <a class="btn" href="/details/${item._id}">Details</a>
</div>`
}


export async function dashboardPage(ctx) {
    const data = await get();
    ctx.render(dashboardTemplate(data))
}