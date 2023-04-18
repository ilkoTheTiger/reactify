export const commuteReducer = (state, action) => {
    switch (action.type) {
        case 'COMMUTE_FETCH':
            return Object.assign({}, action.payload);
        case 'COMMENT_ADD':
            return {
                ...state,
                comments: [
                    ...state.comments,
                    {
                        ...action.payload,
                        author: {
                            email: action.userEmail,
                        }
                    }
                ],
                reservations: state.reservations
            }
        case 'COMMENT_DELETE':
            return {
                ...state,
                comments: [...state.comments].filter(comment => comment._id !== action.payload ),
                reservations: state.reservations
            }
        case 'RESERVATION_ADD':
            return {
                ...state,
                comments: [
                    ...state.comments,
                ],
                reservations: state.reservations + 1
            }
        case 'RESERVATION_DELETE':
            return {
                ...state,
                comments: [
                    ...state.comments,
                ],
                reservations: state.reservations - 1
            }
        default:
            return state;
    }
};