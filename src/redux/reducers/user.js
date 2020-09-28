import { LOGIN_USER, SIGN_OUT_USER } from "../actions/auth";
import {SAVE_CONNECTED_SERVICES} from "../actions/user";

const initialState = {
  isLoggedIn: false,
  connectedServices: [],
  token: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, isLoggedIn: action.isLoggedIn, token: action.token };
    case SIGN_OUT_USER:
      return { ...state, isLoggedIn: false, token: null };
    case SAVE_CONNECTED_SERVICES:
      return { ...state, connectedServices: action.services };
    default:
      return state;
  }
};

export default user;
