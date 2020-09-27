export const LOGIN_USER = "LOGIN_USER";
export const SIGN_OUT_USER = "SIGN_OUT_USER";

export const setUserAuthState = (isLoggedIn, token) => ({
  type: LOGIN_USER,
  isLoggedIn: isLoggedIn,
  token: token,
});

export const signOutUser = () => ({
  type: SIGN_OUT_USER,
});
