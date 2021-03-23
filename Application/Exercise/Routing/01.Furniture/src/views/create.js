import { html } from "../../node_modules/lit-html/lit-html.js";
import * as api from '../api/api.js';

function createTemplate(onLogout, onSubmit) {
    return html`
    <header>
        <h1><a href="/">Furniture Store</a></h1>
        <nav>
            <a id="catalogLink" href="/">Dashboard</a>
            <div id="user">
                <a id="createLink" href="/create">Create Furniture</a>
                <a id="profileLink" href="/my-furniture">My Publications</a>
                <a @click="${onLogout}" id="logoutBtn" href="javascript:void(0)">Logout</a>
            </div>
        </nav>
    </header>
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Create New Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit="${onSubmit}">
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control valid" id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control is-valid" id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control is-invalid" id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>`
}

export async function createPage(ctx) {

    async function onSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const make = form.get('make');
        const model = form.get('model');
        let year = form.get('year');
        const description = form.get('description');
        let price = form.get('price');
        const img = form.get('img');
        const material = form.get('material');
        const furnitureObj = {make, model, year, description, price, img, material};

        if (make.length <= 4 || model.length <= 4) {
            alert('Make and Model must be at least 4 symbols long!');
        } else if (Number(year) < 1950 || Number(year) > 2050) {
            alert('Year must be between 1950 and 2050!');
        } else if (description.length < 10) {
            alert('Description must be more than 10 symbols!')
        } else if (Number(price) < 0) {
            alert('Price must be a positive number!')
        } else if (img == '') {
            alert('Image URL is required!');
        } else {
            await api.create(furnitureObj);
            ctx.page.redirect(`/`);
        }
    }


    async function onLogout() {
        confirm('Do you want to logout?')
        await api.logout();
        ctx.page.redirect('/');
    }

    ctx.render(createTemplate(onLogout, onSubmit))
}