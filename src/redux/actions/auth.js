export const SET_USER_AUTH_STATE = "SET_USER_AUTH_STATE";
export const SIGN_OUT_USER = "SIGN_OUT_USER";

export const setUserAuthState = (isLoggedIn, token) => ({
  type: SET_USER_AUTH_STATE,
  isLoggedIn: isLoggedIn,
  token: token,
});

export const signOutUser = () => ({
  type: SIGN_OUT_USER,
});
