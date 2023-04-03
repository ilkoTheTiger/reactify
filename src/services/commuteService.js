import { requestFactory } from "./requester"

const baseUrl = 'http://localhost:3030/data/commutes'

export const commuteServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const query = encodeURIComponent(`commuteId="${commuteId}"`);

        const result = await request.get(`${baseUrl}?where=${query}`);
        const commutes = Object.values(result);
    
        return commutes;
    };

    const getOne = async (commuteId) => {
        const result = await request.get(`${baseUrl}/${commuteId}`);

        return result;
    };

    const create = async (gameData) => {
        const result = await request.post(baseUrl, gameData);

        return result;
    };

    const addComment = async (commuteId, data) => {
        const result = await request.post(`${baseUrl}/${commuteId}/comments`, data);

        return result;
    };

    return {
        getAll,
        getOne,
        create,
        addComment
    };
};