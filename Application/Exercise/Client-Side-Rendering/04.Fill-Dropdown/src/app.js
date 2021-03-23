import { request } from './data.js';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { optionTemplate } from './template.js'

async function start() {
    const data = await request('http://localhost:3030/jsonstore/advanced/dropdown', { method: 'get' });
    const container = document.getElementById('menu');
    const result = optionTemplate(Object.values(data));

    render(result, container);
}

start();

document.getElementById('addBtn').addEventListener('click', async function (e) {
    e.preventDefault();
    if (document.getElementById('itemText').value != '') {
        const data = await request('http://localhost:3030/jsonstore/advanced/dropdown', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: document.getElementById('itemText').value
            })
        })

        start();
        document.getElementById('itemText').value = '';
    }
})
