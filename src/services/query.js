import axios from "axios";
import { CLIENT_URL, DISCORD_URL } from "../constants";

export const sendCode = (service, code, token) => {
  let redirect_uri;
  redirect_uri = service === "discord" ? DISCORD_URL : CLIENT_URL;
  redirect_uri = redirect_uri + `authorize/${service}`;
  return axios({
    url: `/v1/services/${service}/link`,
    method: "post",
    data: {
      code,
      redirect_uri,
    },
    headers: {
      Authorization: token,
    },
  });
};

export const getServices = (token) => {
  return axios({
    url: `/v1/services/`,
    method: "get",
    headers: {
      Authorization: token,
    },
  });
};
