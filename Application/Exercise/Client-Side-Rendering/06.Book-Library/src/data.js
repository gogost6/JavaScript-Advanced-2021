import { request } from './externalFunctions.js';

async function getBooks() {
    return Object
        .entries(await request('http://localhost:3030/jsonstore/collections/books', { method: 'get' }))
        .map(([k,v]) => Object.assign(v, { _id: k}));
}

async function deleteBook(id) {
    await request('http://localhost:3030/jsonstore/collections/books/' + id, { method: 'delete' });
}

async function editBook(data, id) {
    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            author: data.author,
            title: data.title
        })
    });
}

async function createBook(data) {
    const list = await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            author: data.author,
            title: data.title
        })
    });
    return list;
}

export {
    getBooks,
    createBook,
    deleteBook,
    editBook
}