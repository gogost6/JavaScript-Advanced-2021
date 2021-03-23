import { render } from '../../node_modules/lit-html/lit-html.js';
import * as request from './data.js';
import { layoutTemplate } from './templates.js';

const onSubmit = {
    'add-form': onCreateSubmit,
    'edit-form': onEditSubmit
}

const ctx = {
    list: [],
    async load() {
        ctx.list = await request.getBooks();
        update();
    },
    async onDelete(id) {
        await request.deleteBook(id);
    },
    async onEdit(id) {
        const book = Object.values(ctx.list).find(b => b._id == id);
        update(book);
    }
}

document.body.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit[e.target.id](formData, e.target);
})

start();

async function start() {
    update();
}

function update(bookToEdit) {
    const result = layoutTemplate(ctx, bookToEdit);
    render(result, document.body);
}

async function onCreateSubmit(formData, form) {
      const book = {
          title: formData.get('title'),
          author: formData.get('author')
      }

      await request.createBook(book);
      form.reset();
}

async function onEditSubmit(formData, form) {
    const id = formData.get('_id');
    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    }

    await request.editBook(book, id);
    form.reset()
    update();
}