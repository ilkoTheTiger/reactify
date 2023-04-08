import { requestFactory } from "./requester"

const baseUrl = 'http://localhost:3030/data/commutes'

export const commuteServiceFactory = (token) => {
    const request = requestFactory();

    const getAll = async () => {
        const result = await request.get(`${baseUrl}`);
        // const commutes = Object.values(result);
    
        return result;
    };

    const getLatest = async () => {
        const result = await request.get(`${baseUrl}?sortBy=_createdOn%20desc&pageSize=3`);
        // const latest = Object.values(result);

        return result;
    }

    async function getPassengers(commuteId) {
        const result = request.get(`http://localhost:3030/data/passengers?where=commuteId%3D%22${commuteId}%22&distinct=_ownerId&count`);
    
        return result || 0;
    };

    const getOne = async (commuteId) => {
        const result = await request.get(`${baseUrl}/${commuteId}`);

        return result;
    };

    const create = async (commuteData) => {
        const result = await request.post(baseUrl, commuteData);

        return result;
    };

    const edit = (commuteId, data) => request.put(`${baseUrl}/${commuteId}`, data);

    const deleteCommute = (commuteId) => request.delete(`${baseUrl}/${commuteId}`); 

    return {
        getAll,
        getLatest,
        getPassengers,
        getOne,
        create,
        edit,
        delete: deleteCommute,
    };
};