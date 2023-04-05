import { requestFactory } from "./requester"

const baseUrl = 'http://localhost:3030/data/commutes'

export const commuteServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(`${baseUrl}`);
        const commutes = Object.values(result);
    
        return commutes;
    };

    const getOne = async (commuteId) => {
        const result = await request.get(`${baseUrl}/${commuteId}`);

        return result;
    };

    const create = async (commuteData) => {
        const result = await request.post(baseUrl, commuteData);

        return result;
    };

    const addComment = async (commuteId, data) => {
        const result = await request.post(`${baseUrl}/${commuteId}/comments`, data);

        return result;
    };

    const edit = (commuteId, data) => request.put(`${baseUrl}/${commuteId}`, data);

    const deleteCommute = (commuteId) => request.delete(`${baseUrl}/${commuteId}`); 

    return {
        getAll,
        getOne,
        create,
        addComment,
        edit,
        delete: deleteCommute,
    };
};