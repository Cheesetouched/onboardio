export const SET_USER_AUTH_STATE = "SET_USER_AUTH_STATE";

export const setUserAuthState = (isLoggedIn, token) => ({
    type: SET_USER_AUTH_STATE,
    isLoggedIn: isLoggedIn,
    token: token
});
