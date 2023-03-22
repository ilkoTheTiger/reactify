import * as request from "./requester"

const baseUrl = 'http://localhost:3005/api/commutes'

export const getAll = async () => {
    const result = await request.get(baseUrl);
    const commutes = result.commutes;
    return commutes;
};

export const create = async (commuteData) => {
    const result = await request.post(baseUrl, commuteData);

    return result;
}