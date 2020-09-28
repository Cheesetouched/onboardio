import axios from "axios";
import { CLIENT_URL } from "../constants";

export const sendCode = (service, code, accounts_server) => {
  let redirect_uri;
  redirect_uri = CLIENT_URL;
  redirect_uri = redirect_uri + `authorize/${service}`;
  return axios({
    url: `/v1/services/${service}/link`,
    method: "post",
    data: {
      code,
      redirect_uri,
      accounts_server,
    },
  });
};

export const getServices = () => {
  return axios({
    url: `/v1/services/`,
    method: "get"
  });
};
