import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/passengers'

const endpoints = {
    'passengersByCommuteId': (commuteId) => `/data/passengers?where=${encodeURIComponent(`commuteId=${commuteId}`)}&count`,
    'passengerByUserId': (commuteId, userId) => `/data/passengers?where=${encodeURIComponent(`_ownerId=${userId} AND commuteId=${commuteId}`)}&count`,
    'reserve': '/data/passengers',
    'leave': '/data/passengers/',
    'getPassengers': (commuteId) => `/data/passengers?where=commuteId%3D%22${commuteId}%22&distinct=_ownerId&count`,
    'getUserReservation': (commuteId, userId) => `/data/passengers?where=commuteId%3D%22${commuteId}%22%20and%20_ownerId%3D%22${userId}%22`,
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
        const result = await request.post(baseUrl + endpoints.reserve, { commuteId });

        return result;
    };

    const unreserveSeat = async (commuteId) => {
        const result = await request.delete(baseUrl + endpoints.leave + commuteId);

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