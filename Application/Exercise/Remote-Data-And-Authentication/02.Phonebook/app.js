function attachEvents() {
    const ul = document.getElementById('phonebook');
    const load = document.getElementById('btnLoad');
    const create = document.getElementById('btnCreate');

    load.addEventListener('click', function() {
        getPhones();
    })

    create.addEventListener('click', function() {
        postData({person: document.getElementById('person').value, phone: document.getElementById('phone').value});
        document.getElementById('person').value = '';
        document.getElementById('phone').value = '';
    })

    ul.addEventListener('click', async function(e) {
        const theName = e.target.parentElement.textContent.split(':')[0];
        console.log(deletePhone(await getId(theName)));
    })

    async function postData(data) {
        const response = await fetch('http://localhost:3030/jsonstore/phonebook', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                person: data.person,
                phone: data.phone
            })
        });
        getPhones();
    }

    async function getId(a) {
        const url = 'http://localhost:3030/jsonstore/phonebook';
        const responce = await fetch(url);
        const data = await responce.json();

        const found = Object.entries(data).find(x => x[1].person == a);

        return found[0];
    }

    async function deletePhone(id) {
        const response = await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {
            method: 'delete'
        });
        const result = await response.json();
    }

    async function getPhones() {
        const url = 'http://localhost:3030/jsonstore/phonebook';
        const responce = await fetch(url);
        const data = await responce.json();

        while(ul.firstChild) {
            ul.lastChild.remove();
        }

        Object.values(data).forEach(x => {
            const li = document.createElement('li');
            li.textContent = `${x.person}: ${x.phone}`;
            li.appendChild(delButton());
            ul.appendChild(li);
        });
    }

    function delButton() {
        const button = document.createElement('button');
        button.textContent = 'Delete';
        return button;
    }
}

attachEvents();