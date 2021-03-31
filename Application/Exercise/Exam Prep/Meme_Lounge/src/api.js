import { notify } from "./notification.js";

const host = 'http://localhost:3030';

async function request(url, options) {
    const response = await fetch(url, options);
    try {
        if (response.ok == false) {
            const error = await response.json();
            // alert(error.message);
            throw new Error(error.message)
        };
        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        notify(err.message);
        throw err;
    }
};

function getOptions(method = 'get', body) {
    const options = {
        method,
        headers: {}
    }

    const token = sessionStorage.getItem('authToken');

    if (token != null) {
        options.headers['X-Authorization'] = token;
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function memeDetails(id) {
    return await request(host + '/data/memes/' + id, getOptions());
};

export async function userMemes() {
    const userId = sessionStorage.getItem('userId');
    return await request(host + `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`, getOptions());
};

export async function getAllMemes() {
    return await request(host + '/data/memes?sortBy=_createdOn%20desc', getOptions());
};

export async function create(data) {
    return await request(host + '/data/memes', getOptions('post', data));
};

export async function edit(id, data) {
    return await request(host + '/data/memes/' + id, getOptions('put', data));
}

export async function del(id) {
    return await request(host + '/data/memes/' + id, getOptions('delete'));
};

export async function login(email, password) {
    const result = await request(host + '/users/login', getOptions('post', { email, password }));

    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('username', result.username);
    sessionStorage.setItem('gender', result.gender);

    return result;
};

export async function register(email, password, username, gender) {
    const result = await request(host + '/users/register', getOptions('post', { email, password, username, gender }));

    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('username', result.username);
    sessionStorage.setItem('gender', result.gender);

    return result;
};

export async function logout() {
    const result = await request(host + '/users/logout', getOptions());

    sessionStorage.removeItem('email');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username', result.username);
    sessionStorage.removeItem('gender', result.gender);

    return result;
};
