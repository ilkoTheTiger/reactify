import * as request from "./requester"

// const baseUrl = 'https://server-production-8381.up.railway.app/api/commutes'
const baseUrl = 'http://localhost:3030/jsonstore/commutes'

export const getAll = async () => {
    const result = await request.get(baseUrl);
    const commutes = Object.values(result);
    return commutes;
};

export const getOne = async (commuteId) => {
    const result = await request.get(`${baseUrl}/${commuteId}`);
    
    return result;
};

export const create = async (commuteData) => {
    const result = await request.post(baseUrl, commuteData);

    return result;
};

export const addComment = async (gameId, data) => {
    const result = await request.post(`${baseUrl}/${gameId}/comments`, data);

    return result;
};