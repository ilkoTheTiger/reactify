import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/comments'
const request = requestFactory(); //potential cause of bug

export const commentServiceFactory = (token) => {

    const getAll = async (commuteId) => {
        const query = encodeURIComponent(`commuteId="${commuteId}"`);

        const result = await request.get(`${baseUrl}?where=${query}`);
        const comments = Object.values(result);

        return comments;
    };

    const create = async (commuteId, comment) => {
        const result = await request.post(baseUrl, { commuteId, comment });

        return result;
    };


    return {
        getAll,
        create,
    }
}