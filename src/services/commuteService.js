import * as request from "./requester"

const baseUrl = 'http://localhost:3005/'

export const create = async (commuteData) => {
    const result = await request.post(baseUrl, commuteData);

    return result;
}