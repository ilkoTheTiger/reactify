import * as request from './requester';

const baseUrl = 'http://localhost:3030/api/users';

export const login = (data) => request.post(`${baseUrl}`,data);

export const register = (data) => request.post(`${baseUrl}`, data);

export const logout = () => request.get(`${baseUrl}/logout`);