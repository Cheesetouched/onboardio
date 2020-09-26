import axios from "axios";

export const sendCode = (service, code, token) => {
  return axios({
    url: `/v1/services/${service}/link`,
    method: "post",
    data: {
      code,
    },
    headers: {
      Authorization: token,
    },
  });
};
