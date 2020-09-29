import axios from "axios";
import { store } from "../redux/store";
import { loginUser } from "../redux/actions/auth";

export const loginUserService = (email, password) => {
  return axios({
    url: `/v1/auth/login`,
    method: "post",
    data: {
      email: email,
      password: password,
    },
  })
    .then((response) => {
      const { status, token, message } = response.data;
      if (status === "LOGGED_IN") {
        window.localStorage.setItem("token", token);
        axios.defaults.headers["Authorization"] = token;
        store.dispatch(loginUser(true, token));
      }

      return response.data;
    })
    .catch(async (error) => {
      return error.response.data;
    });
};

export const registerUserService = (email, password) => {
  return axios({
    url: `/v1/auth/register`,
    method: "post",
    data: {
      email: email,
      password: password,
    },
  }).then((response) => {
    const { status, token, message } = response.data;
    if (status === "USER_REGISTERED") {
      window.localStorage.setItem("token", token);
      axios.defaults.headers["Authorization"] = token;
      store.dispatch(loginUser(true, token));
    }
    return response.data;
  });
};
