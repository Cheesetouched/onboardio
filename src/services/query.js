import axios from "axios";
import { CLIENT_URL, DISCORD_URL } from "../constants";

export const sendCode = (service, code, token) => {
  let redirect_url;
  redirect_url = service === "discord" ? DISCORD_URL : CLIENT_URL;
  redirect_url = redirect_url + `authorize/${service}`;
  return axios({
    url: `/v1/services/${service}/link`,
    method: "post",
    data: {
      code,
      redirect_url,
    },
    headers: {
      Authorization: token,
    },
  });
};
