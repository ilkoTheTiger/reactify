import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/passengers'

const endpoints = {
    'passengersByCommuteId': (commuteId) => `?where=${encodeURIComponent(`commuteId=${commuteId}`)}&count`,
    'passengerByUserId': (commuteId, userId) => `?where=${encodeURIComponent(`_ownerId=${userId} AND commuteId=${commuteId}`)}&count`,
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

    const getPassengersByCommuteId = async (commuteId, userId) => {
        const requests = [];

        requests.push(request.get(baseUrl + endpoints.passengersByCommuteId(commuteId)));

        if (userId) {
            requests.push(request.get(baseUrl + endpoints.passengerByUserId(commuteId, userId)))
        }

        const [reservations, userReservation] = await Promise.all(requests)

        return {
            reservations,
            canReserve: !userId || !userReservation
        };
    };

    const reserveSeat = async (commuteId) => {
        const result = await request.post(baseUrl, { commuteId });

        return result;
    };

    const unreserveSeat = async (reservationId) => {
        const result = await request.delete(`${baseUrl}/${reservationId}`);

        return result;
    };


    // const getAll = async (commuteId) => {
    //     const searchQuery = encodeURIComponent(`commuteId="${commuteId}"`);
    //     const relationQuery = encodeURIComponent(`author=_ownerId:users`)

    //     const result = await request.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);
    //     const comments = Object.values(result);

    //     return comments;
    // };

    // const create = async (commuteId, comment) => {
    //     const result = await request.post(baseUrl, { commuteId, comment });

    //     return result;
    // };


    return {
        getAllPassengers,
        getUserReservation,
        getPassengersByCommuteId,
        reserveSeat,
        unreserveSeat,
    }
}