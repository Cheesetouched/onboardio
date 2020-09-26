import {SET_USER_AUTH_STATE} from "../actions/auth";

const initialState = {
    isLoggedIn: false,
    token: null
};

const user = (state = initialState , action) => {
    switch (action.type) {
        case SET_USER_AUTH_STATE:
            return { ...state, isLoggedIn: action.isLoggedIn, token: action.token};
        default:
            return state;
    }
};

export default user;
