import { html } from '../../node_modules/lit-html/lit-html.js';
import { edit, getCarDetails } from '../api.js';

function editTemplate(data, onSubmit) {
    return html`
    <section id="edit-listing">
        <div class="container">
    
            <form @submit="${onSubmit}" id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>
    
                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" value="${data.brand}">
    
                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" value="${data.model}">
    
                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" value="${data.description}">
    
                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" value="${data.year}">
    
                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" value="${data.imageUrl}">
    
                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" value="${data.price}">
    
                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>
    `;
}

export async function editPage(ctx) {
    console.log('edit-page created');
    const data = await getCarDetails(ctx.params.id);
    ctx.render(editTemplate(data, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const brand = form.get('brand');
        const model = form.get('model');
        const year = form.get('year');
        const description = form.get('description');
        const imageUrl = form.get('imageUrl');
        const price = form.get('price');
        
        const carObj = {brand, model, year, description, imageUrl, price};

        if (brand == '' || model == '' || year == '' || description == '' || imageUrl == '' || price == '') {
            alert('Empty inputs!');
        } else {
            await edit(ctx.params.id, carObj);
            ctx.page.redirect(`/details/${ctx.params.id}`);
        }
    }
}