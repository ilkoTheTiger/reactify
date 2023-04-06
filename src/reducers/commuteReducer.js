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
                ]
            }
        default:
            return state;
    }
};