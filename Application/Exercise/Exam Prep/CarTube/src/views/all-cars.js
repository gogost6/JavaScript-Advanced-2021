import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllCars, getCollectionSize } from '../api.js'
function allCarsTemplate(data, page, pages) {
    return html`
    <section id="car-listings">
        <h1>Car Listings</h1>
        <div class="listings">
            <div>Page ${page} / ${pages}
            ${page > 1 ? html`<a class="button-list" href="/all-cars?page=${page - 1}">&lt; Prev</a>` : ''}
            ${page < pages ? html`<a class="button-list" href="/all-cars?page=${page + 1}">Next &gt;</a>` : ''}
        </div>
        ${data.length > 0 
            ? data.map(car => html`<div class="listing">
                        <div class="preview">
                            <img src="${car.imageUrl}">
                        </div>
                        <h2> ${car.brand} ${car.model}</h2>
                        <div class="info">
                            <div class="data-info">
                                <h3>Year: ${car.year}</h3>
                                <h3>Price: ${car.price} $</h3>
                            </div>
                            <div class="data-buttons">
                                <a href="/details/${car._id}" class="button-carDetails">Details</a>
                            </div>
                        </div>
                    </div>` )
            : html`<p class="no-cars">No cars in database.</p>`}
        </div>
    </section>`;
}

export async function allCarsPage(ctx) {
    const page = Number(ctx.querystring.split('=')[1]) || 1;
    const count = await getCollectionSize();
    const pages = Math.ceil(count / 3);
    const data = await getAllCars(page);
    ctx.render(allCarsTemplate(data, page, pages))
}