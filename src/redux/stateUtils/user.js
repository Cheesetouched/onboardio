export const checkIfUserLoggedIn = (state) => state.user.isLoggedIn;
export const getUserToken = (state) => state.user.token;

export const getConnectedServices = (state) => state.user.connectedServices;