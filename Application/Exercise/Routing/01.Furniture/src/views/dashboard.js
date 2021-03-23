import { html } from '../../node_modules/lit-html/lit-html.js'
import {get, logout} from '../api/api.js'

function dashboardTemplate(data, onClick) {
    const user = sessionStorage.getItem('authToken');
    return html`<header>
                    <h1><a href="/dashboard">Furniture Store</a></h1>
                    <nav>
                        <a id="catalogLink" href="/" class="active">Dashboard</a>
                        ${user ? html`<div id="user" >
                            <a id="createLink" href="/create">Create Furniture</a>
                            <a id="profileLink" href="/my-furniture">My Publications</a>
                            <a @click="${onClick}" id="logoutBtn" href="javascript:void(0)">Logout</a>
                        </div>` 
                        : html`<div id="guest">
                            <a id="loginLink" href="/login">Login</a>
                            <a id="registerLink" href="/register">Register</a>
                        </div>`}
                    </nav>
                </header>
    <div class="row space-top">
                    <div class="col-md-12">
                        <h1>Welcome to Furniture System</h1>
                        <p>Select furniture from the catalog to view details.</p>
                    </div>
                </div>
                <div class="row space-top">
                    ${data.map(itemTemplate)}
                </div>` 
}

function itemTemplate(item) {
    return html`<div class="col-md-4">
                    <div class="card text-white bg-primary">
                        <div class="card-body">
                                <img src="${item.img}" />
                                <p>Description here</p>
                                <footer>
                                    <p>Price: <span>${item.price}$</span></p>
                                </footer>
                                <div>
                                    <a href="/details/${item._id}" class="btn btn-info">Details</a>
                                </div>
                        </div>
                    </div>
                </div>`
}

export async function dashboardPage(ctx) {
    const data = await get();
    async function onLogout() {
        if(confirm('Do you want to logout?')) {
            await logout();
            ctx.page.redirect('/');
        }
    }
    ctx.render(dashboardTemplate(data, onLogout));
}