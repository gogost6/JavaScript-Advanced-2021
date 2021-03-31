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

export async function getCarDetails(id) {
    return await request(host + '/data/cars/' + id, getOptions());
};

export async function getMyCars() {
    const userId = sessionStorage.getItem('userId');
    return await request(host + `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`, getOptions());
};

export async function getAllCars() {
    return await request(host + '/data/cars?sortBy=_createdOn%20desc', getOptions());
};

export async function create(data) {
    return await request(host + '/data/cars', getOptions('post', data));
};

export async function edit(id, data) {
    return await request(host + '/data/cars/' + id, getOptions('put', data));
}

export async function del(id) {
    return await request(host + '/data/cars/' + id, getOptions('delete'));
};

export async function login(username , password) {
    const result =  await request(host + '/users/login', getOptions('post', { username, password}));
    
    sessionStorage.setItem('username', result.username);
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    
    return result;
};

export async function logout() {
    const result = await request(host + '/users/logout', getOptions());
    
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    
    return result;
};

export async function register(username, password) {
    const result = await request(host + '/users/register', getOptions('post', { username, password }));
    
    sessionStorage.setItem('username', result.email);
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    
    return result;
};