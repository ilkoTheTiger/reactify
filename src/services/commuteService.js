import { requestFactory } from "./requester"

const baseUrl = 'http://localhost:3030/data/commutes'

export const commuteServiceFactory = (token) => {
    const request = requestFactory();

    const getAll = async () => {
        const result = await request.get(`${baseUrl}`);
        const commutes = Object.values(result);
    
        return commutes;
    };

    async function getPassengers(commuteId) {
        const result = request.get(`http://localhost:3030/data/passengers?where=commuteId%3D%22${commuteId}%22&distinct=_ownerId&count`);
    
        return result;
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
        getPassengers,
        getOne,
        create,
        edit,
        delete: deleteCommute,
    };
};