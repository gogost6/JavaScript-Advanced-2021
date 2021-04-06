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
    } catch(err) {
        alert(err.message);
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

export async function getDetails(id) {
    return await request(host + '/data/wiki/' + id, getOptions());
};

export async function get() {
    return await request(host + '/data/wiki?sortBy=_createdOn%20desc', getOptions());
};

export async function getHome() {
    return await request(host + '/data/wiki?sortBy=_createdOn%20desc&distinct=category', getOptions());
};

export async function create(data) {
    return await request(host + '/data/wiki', getOptions('post', data));
};

export async function edit(id, data) {
    return await request(host + '/data/wiki/' + id, getOptions('put', data));
}

export async function del(id) {
    return await request(host + '/data/wiki/' + id, getOptions('delete'));
};

export async function login(email , password) {
    const result =  await request(host + '/users/login', getOptions('post', {email, password}));
    
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    
    return result;
};

export async function logout() {
    const result = await request(host + '/users/logout', getOptions());
    
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    
    return result;
};

export async function register(email, password) {
    const result = await request(host + '/users/register', getOptions('post', { email, password }));
    
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    
    return result;
};

export async function search(query) {
    return await request(host + `/data/wiki?where=title%20LIKE%20%22${query}%22`, getOptions('get'))
}