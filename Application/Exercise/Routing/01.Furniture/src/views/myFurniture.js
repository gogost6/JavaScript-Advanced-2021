import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyFurnitures, logout } from "../api/api.js";

function myFurnitureTemplate(data, onClick) {

    return html`<header>
                    <h1><a href="/">Furniture Store</a></h1>
                    <nav>
                        <a id="catalogLink" href="/" class="active">Dashboard</a>
                        <div id="user">
                            <a id="createLink" href="/create" >Create Furniture</a>
                            <a id="profileLink" href="/my-furniture" >My Publications</a>
                            <a @click="${onClick}" id="logoutBtn" href="javascript:void(0)">Logout</a>
                        </div>
                    </nav>
                </header>
                <div class="row space-top">
                    <div class="col-md-12">
                        <h1>My Furniture</h1>
                        <p>This is a list of your publications.</p>
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
                                <p>Price: <span>${item.price} $</span></p>
                            </footer>
                            <div>
                                <a href="/details/${item._id}" class="btn btn-info">Details</a>
                            </div>
                        </div>
                    </div>
                </div>`
}

export async function myFurniturePage(ctx) {
    const data = await getMyFurnitures();
    async function onLogout() {
        if(confirm('Do you want to logout?')) {
            await logout();
            ctx.page.redirect('/');
        }
    }
    ctx.render(myFurnitureTemplate(data, onLogout));
}