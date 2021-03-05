document.getElementById('loadBooks').addEventListener('click', function () {
    getData();
})

document.querySelector('table').addEventListener('click', async function (e) {
    e.preventDefault();
    if (e.target.tagName == 'BUTTON') {
        let parent = e.target.parentNode.parentNode;
        const url = 'http://localhost:3030/jsonstore/collections/books';
        const responce = await fetch(url);
        const data = await responce.json();
        const found = Object.entries(data).find(x => x[1].author == parent.children[1].textContent);
        if (e.target.innerHTML == 'Edit') {
            document.getElementById('form').textContent = 'Edit FORM';
            let title = document.getElementById('title');
            let author = document.getElementById('author');
            document.getElementById('submit').textContent = 'Save';
            document.getElementById('submit').value = 'Save';
            title.value = parent.children[0].textContent;
            author.value = parent.children[1].textContent;
            document.querySelector('#formMenu [name="id"]').value = found[0];
        } else if (e.target.textContent == 'Delete') {
            deleteId(found[0]);
        }
    }
})

document.getElementById('submit').addEventListener('click', function (e) {
    e.preventDefault();
    let title = document.getElementById('title');
    let author = document.getElementById('author');

    if (e.target.value == 'Save') {
        putData({ author: author.value, title: title.value }, document.querySelector('#formMenu [name="id"]').value);
        document.getElementById('submit').textContent = 'Submit';
        document.getElementById('submit').value = 'Submit';
    } else if(e.target.value == 'Submit'){
        if (title.value != '' && author.value != '') {
            postData({ author: author.value, title: title.value });
        }
    }

    title.value = '';
    author.value = '';
})

async function putData(data, id) {
    const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: 'put',
        body: JSON.stringify({
            author: data.author,
            title: data.title
        })
    });
}

async function postData(data) {
    const response = await fetch('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        body: JSON.stringify({
            author: data.author,
            title: data.title
        })
    });
}

async function getData() {
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const responce = await fetch(url);
    const data = await responce.json();
    const tbody = document.getElementById('tbody')
    tbody.innerHTML = '';
    Object.entries(data).forEach(x => {
        tbody.innerHTML += template(x[1], x[0]);
    });
}

async function deleteId(id) {
    const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: 'delete'
    });
    const result = await response.json();
}

function template(x, id) {
    const htmlExample = `<tr data-id="${id}">
                            <td>${x.title}</td>
                            <td>${x.author}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>`;
    return htmlExample;
}