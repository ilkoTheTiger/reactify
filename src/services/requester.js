const requester = async (method, token, url, data) => {
    const options = {};

    
    if (method !== 'GET') {
        options.method = method;
        
        if (data) {
            options.headers = {
                'Content-Type': 'application/json',
            };
            options.body = JSON.stringify(data);
        };
    };
    
    const serializedAuth = localStorage.getItem('auth');
    if (serializedAuth) {
        const auth = JSON.parse(serializedAuth);

        if (auth.accessToken) {
            options.headers = {
                ...options.headers,
                'X-Authorization': auth.accessToken,
            };
        }
    };
     
    const response = await fetch(url, options);

    if (response.status === 204) {
        return {};
    }

    if (response.status === 403) {
        localStorage.clear();
        return {};
    }

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;

};

export const requestFactory = (token) => {
    return {
        get: requester.bind(null, 'GET', token),
        post: requester.bind(null, 'POST', token),
        put: requester.bind(null, 'PUT', token),
        patch: requester.bind(null, 'PATCH', token),
        delete: requester.bind(null, 'DELETE', token),
    }
};