document.getElementById('registerBtn').addEventListener('click', register);

async function register(e) {
    e.preventDefault();

    if(sessionStorage.length > 0) {
        return alert('You are already logged in!');
    }

    const form = document.querySelectorAll('form')[0];
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    if (email == '' || password == '') {
        return alert('All fields are required');
    } else if (password != rePass) {
        return alert('Passwords don\'t match!');
    }

    const responce = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    if (responce.ok == false) {
        const error = await responce.json();
        return alert(error.message);
    }

    const data = await responce.json();
    
    sessionStorage.setItem('userToken', data.accessToken);
    sessionStorage.setItem('ownerId', data._id);

    window.location.pathname = '/index.html';
}

document.getElementById('loginBtn').addEventListener('click', login);

async function login(e) {
    e.preventDefault();

    if(sessionStorage.length > 0) {
        return alert('You are already logged in!');
    }
    
    const form = document.querySelectorAll('form')[1];
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    const responce = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    if (responce.ok == false) {
        const error = await responce.json();
        return alert(error.message);
    }

    const data = await responce.json();
    
    sessionStorage.setItem('userToken', data.accessToken);
    sessionStorage.setItem('ownerId', data._id);

    window.location.pathname = '/index.html';
}