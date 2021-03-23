import { html } from "../../node_modules/lit-html/lit-html.js";
import * as api from "../api/api.js";

function detailsTemplate(data, onClick, onDelete) {
    const user = sessionStorage.getItem('userId');
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
                        <h1>Furniture Details</h1>
                    </div>
                </div>
                <div class="row space-top">
                    <div class="col-md-4">
                        <div class="card text-white bg-primary">
                            <div class="card-body">
                                <img src=".${data.img}" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <p>Make: <span>${data.make}</span></p>
                        <p>Model: <span>${data.model}</span></p>
                        <p>Year: <span>${data.year}</span></p>
                        <p>Description: <span>${data.description}</span></p>
                        <p>Price: <span>${data.price}$</span></p>
                        <p>Material: <span>${data.material}</span></p>
                        ${user == data._ownerId ? html`<div>
                            <a href="/edit/${data._id}" class="btn btn-info">Edit</a>
                            <a @click="${onDelete}" class="btn btn-red">Delete</a>
                        </div>` : ''}
                    </div>
                </div>`
}

export async function detailsPage(ctx) {
    const data = await api.getDetails(ctx.params.id);
    ctx.render(detailsTemplate(data, onLogout, onDelete));

    async function onLogout() {
        if(confirm('Do you want to logout?')) {
            await api.logout();
            ctx.page.redirect('/');
        }
    }

    async function onDelete() {
        if(confirm('Do you want to delete your post?')) {
            await api.del(ctx.params.id);
            ctx.page.redirect('/');
        } 
    }
}