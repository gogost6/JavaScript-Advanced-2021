import { html } from '../../node_modules/lit-html/lit-html.js';
import { create } from '../api.js';

function createTemplate(onSubmit) {
    return html`
    <section id="create-listing">
        <div class="container">
            <form @submit="${onSubmit}" id="create-form">
                <h1>Create Car Listing</h1>
                <p>Please fill in this form to create an listing.</p>
                <hr>

                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand">

                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model">

                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description">

                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year">

                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl">

                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price">

                <hr>
                <input type="submit" class="registerbtn" value="Create Listing">
            </form>
        </div>
    </section>
    `;
}

export async function createPage(ctx) {
    console.log('create-page created');
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const brand = form.get('brand');
        const model = form.get('model');
        const year = form.get('year');
        const description = form.get('description');
        const imageUrl = form.get('imageUrl');
        const price = form.get('price');

        if (brand == '' || model == '' || year == '' || description == '' || imageUrl == '' || price == '') {
            alert('Empty inputs!');
        } else if(Number(year) == NaN || Number(price) == NaN) {
            alert('Price and year should be numbers!');
        }else {
            const carObj = {brand, model, year: Number(year), description, imageUrl, price: Number(price)};
            await create(carObj);
            ctx.page.redirect(`/all-cars`);
        }
    }
}