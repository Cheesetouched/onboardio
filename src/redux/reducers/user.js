import { LOGIN_USER, SIGN_OUT_USER } from "../actions/auth";

const initialState = {
  isLoggedIn: false,
  token: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, isLoggedIn: action.isLoggedIn, token: action.token };
    case SIGN_OUT_USER:
      return { ...state, isLoggedIn: false, token: null };
    default:
      return state;
  }
};

export default user;
