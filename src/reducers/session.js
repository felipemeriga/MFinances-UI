import {CLEAR_SESSION, SESSION_ERROR, SET_SESSION} from "../actions/types";


const initialState = {
    isLoggedIn: false,
    credentials: {},
    user: {},
    error: {}
};

const session = (state = initialState, action) => {
    switch (action.type) {
        case SET_SESSION:
            return {
                isLoggedIn: true,
                credentials: action.payload.credentials,
                user: action.payload.user,
            };

        case CLEAR_SESSION:
            return initialState;
        case SESSION_ERROR:
            return {
                ...state,
                isLoggedIn: true,
                error: action.payload
            };

        default:
            return state;
    }
};

export default session;
