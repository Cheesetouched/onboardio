import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import { BACKEND_SERVER_URL } from "./constants";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { loginUser } from "./redux/actions/auth";

axios.defaults.baseURL = BACKEND_SERVER_URL;

function setUserLoginState() {
  const token = window.localStorage.getItem("token");

  if (token) {
    store.dispatch(loginUser(true, token));
  } else {
    store.dispatch(loginUser(false, null));
  }
}

setUserLoginState();

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
