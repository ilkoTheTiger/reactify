import { requestFactory } from './requester';


const baseUrl = 'https://metnime.onrender.com/data/passengers'
// const baseUrl = 'http://localhost:3030/data/passengers'

const endpoints = {
    'getPassengers': (commuteId) => `?where=commuteId%3D%22${commuteId}%22&distinct=_ownerId&count`,
    'getUserReservation': (commuteId, userId) => `?where=commuteId%3D%22${commuteId}%22%20and%20_ownerId%3D%22${userId}%22`,
}

export const passengerServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAllPassengers = async (commuteId) => {
        const result = request.get(baseUrl + endpoints.getPassengers(commuteId));

        return result;
    };

    const getUserReservation = async (commuteId, userId) => {
        const result = request.get(baseUrl + endpoints.getUserReservation(commuteId, userId));

        return result;
    };

    const reserveSeat = async (commuteId) => {
        const result = await request.post(baseUrl, { commuteId });

        return result;
    };

    const unreserveSeat = async (reservationId) => {
        const result = await request.delete(`${baseUrl}/${reservationId}`);

        return result;
    };

    return {
        getAllPassengers,
        getUserReservation,
        reserveSeat,
        unreserveSeat,
    }
}