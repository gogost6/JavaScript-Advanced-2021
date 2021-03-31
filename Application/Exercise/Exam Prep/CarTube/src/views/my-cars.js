import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyCars } from '../api.js'

function myCarsTemplate(data) {
    return html`
    <section id="my-listings">
        <h1>My car listings</h1>
        <div class="listings">
            ${data.length > 0 
                ? data.map(car => html`<div class="listing">
                    <div class="preview">
                        <img src="${car.imageUrl}">
                    </div>
                    <h2>${car.brand} ${car.model}</h2>
                    <div class="info">
                        <div class="data-info">
                            <h3>Year: ${car.year}</h3>
                            <h3>Price: ${car.price} $</h3>
                        </div>
                        <div class="data-buttons">
                            <a href="/details/${car._id}" class="button-carDetails">Details</a>
                        </div>
                    </div>
                </div>`)
                : html`<p class="no-cars"> You haven't listed any cars yet.</p>`}   
        </div>
    </section>`;
}

export async function myCarsPage(ctx) {
    console.log('myCars');
    const data = await getMyCars();
    ctx.render(myCarsTemplate(data))
}