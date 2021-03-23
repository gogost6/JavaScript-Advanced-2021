import { html } from '../../node_modules/lit-html/lit-html.js';

const tableTemplate = (ctx) => {
    return html`
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody @click=${e => onBtnClick(e, ctx)}>
            ${Object.entries(ctx.list).map(([id, book]) => html`<tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td data-id="${book._id}">
                    <button class="editBtn">Edit</button>
                    <button class="deleteBtn">Delete</button>
                </td>
            </tr>`)}
        </tbody>
    </table>`
}

const formCreate = () => {
    return html`
        <form id="add-form">
            <h3>Add book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title...">
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author...">
            <input type="submit" value="Submit">
        </form>`;
}

const formEdit = (book) => {
    return html`
            <form id="edit-form">
                <input type="hidden" name="_id" .value=${book._id}>
                <h3>Edit book</h3>
                <label>TITLE</label>
                <input type="text" name="title" placeholder="Title..." .value=${book.title}>
                <label>AUTHOR</label>
                <input type="text" name="author" placeholder="Author..." .value=${book.author}>
                <input type="submit" value="Save">
            </form>`;
}

const layoutTemplate = (ctx, bookToEdit) => {
    return html`
        <button @click=${ctx.load} id="loadBooks">LOAD ALL BOOKS</button>
        ${tableTemplate(ctx)}
        ${bookToEdit ? formEdit(bookToEdit) : formCreate()}
    `;
}

function onBtnClick(e, ctx) {
    if (e.target.classList.contains('editBtn')) {
        const id = e.target.parentNode.dataset.id;
        ctx.onEdit(id);
    } else if (e.target.classList.contains('deleteBtn')) {
        const id = e.target.parentNode.dataset.id;
        ctx.onDelete(id);
    }
}

export { layoutTemplate }