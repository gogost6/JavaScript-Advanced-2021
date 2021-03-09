const nav = document.querySelector('nav');
const catches = document.getElementById('catches');

document.getElementById('catches').addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.tagName == 'BUTTON') {
        if (e.target.innerHTML == 'Update') {
            const obj = {
                angler: e.target.parentNode.querySelector('.angler').value,
                weight: e.target.parentNode.querySelector('.weight').value,
                species: e.target.parentNode.querySelector('.species').value,
                location: e.target.parentNode.querySelector('.location').value,
                bait: e.target.parentNode.querySelector('.bait').value,
                'captureTime ': e.target.parentNode.querySelector('.captureTime').value
            };

            if (Object.values(obj).every(x => x != '')) {
                putData(obj, e.target.parentNode.id);
            }
            load();
        } else if (e.target.innerHTML == 'Delete') {
            deleteId(e.target.parentNode.id);
            load();
        }
    }
})

async function putData(data, id) {
    const token = sessionStorage.getItem('userToken');
    const response = await fetch(`http://localhost:3030/data/catches/${id}`, {
        method: 'put',
        body: JSON.stringify({
            angler: data.angler,
            weight: data.weight,
            species: data.species,
            location: data.location,
            bait: data.bait,
            'captureTime ': data['captureTime ']
        }),
        headers: { 'X-Authorization': token }
    });
}

async function deleteId(id) {
    const token = sessionStorage.getItem('userToken');
    const response = await fetch(`http://localhost:3030/data/catches/${id}`, {
        method: 'delete',
        headers: { 'X-Authorization': token }
    });
}

async function postData(data) {
    const token = sessionStorage.getItem('userToken');
    const response = await fetch('http://localhost:3030/data/catches', {
        method: 'post',
        body: JSON.stringify({
            "angler": data.angler,
            "weight": data.weight,
            "species": data.species,
            "location": data.location,
            "bait": data.bait,
            "captureTime ": data['captureTime ']
        }),
        headers: { 'X-Authorization': token }
    });
}

if (sessionStorage.getItem('userToken') != null) {
    createLogout();
    document.querySelector('button.add').disabled = false;
    document.querySelector('button.add').addEventListener('click', async function (e) {
        const obj = {
            angler: e.target.parentNode.querySelector('.angler').value,
            weight: e.target.parentNode.querySelector('.weight').value,
            species: e.target.parentNode.querySelector('.species').value,
            location: e.target.parentNode.querySelector('.location').value,
            bait: e.target.parentNode.querySelector('.bait').value,
            'captureTime ': e.target.parentNode.querySelector('.captureTime').value
        };

        if (Object.values(obj).every(x => x != '')) {
            postData(obj);
        }

        load();

        e.target.parentNode.querySelector('.angler').value = '';
        e.target.parentNode.querySelector('.weight').value = '';
        e.target.parentNode.querySelector('.species').value = '';
        e.target.parentNode.querySelector('.location').value = '';
        e.target.parentNode.querySelector('.bait').value = '';
        e.target.parentNode.querySelector('.captureTime').value = '';
        
    })
}

function createLogout() {
    const div = document.createElement('div');
    const button = document.createElement('button');
    button.textContent = 'Logout';
    button.id = 'logoutBtn';
    div.appendChild(button);
    nav.appendChild(div);
}

if (document.getElementById('logoutBtn') != null) {
    document.getElementById('logoutBtn').addEventListener('click', async function (e) {
        const token = sessionStorage.getItem('userToken');
        const responce = await fetch('http://localhost:3030/users/logout', {
            method: 'get',
            headers: { 'X-Authorization': token }
        })

        if (responce.ok == false) {
            const error = await responce.json();
            return alert(error.message);
        }

        nav.children[2].remove();
        document.querySelector('button.add').disabled = true;

        Array.from(document.getElementById('catches').children).forEach(x => {
            if (x.dataset.creator == sessionStorage.getItem('ownerId')) {
                x.children[18].disabled = true;
                x.children[19].disabled = true;
            }
        })
        sessionStorage.clear();
        load();
    })
}

async function load() {
    catches.innerHTML = '';
    let values = Object.values(await getData());
    values.forEach(element => {
        let child = catchTemplate(element);
        catches.innerHTML += child;
    });

    Array.from(document.getElementById('catches').children).forEach(x => {
        if (x.dataset.creator == sessionStorage.getItem('ownerId')) {
            x.children[18].disabled = false;
            x.children[19].disabled = false;
        }
    })
}

document.querySelector('button.load').addEventListener('click', load);

async function getData() {
    const url = 'http://localhost:3030/data/catches';
    const responce = await fetch(url);
    const data = await responce.json();

    return data;
}

function catchTemplate(x, bool) {
    let html = `<div id="${x._id}" class="catch" data-creator="${x._ownerId}">
    <label>Angler</label>
    <input type="text" class="angler" value="${x.angler}" />
    <hr>
    <label>Weight</label>
    <input type="number" class="weight" value="${x.weight}" />
    <hr>
    <label>Species</label>
    <input type="text" class="species" value="${x.species}" />
    <hr>
    <label>Location</label>
    <input type="text" class="location" value="${x.location}" />
    <hr>
    <label>Bait</label>
    <input type="text" class="bait" value="${x.bait}" />
    <hr>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${x['captureTime ']}" />
    <hr>
    <button disabled=${bool} class="update">Update</button>
    <button disabled=${bool} class="delete">Delete</button>
</div>`

    return html;
}