import axios from "axios";
import { store } from "../redux/store";
import { saveConnectedServices } from "../redux/actions/services";

export const fetchConnectedServicesList = () => {
  return axios({
    url: `/v1/services/`,
    method: "get",
  })
    .then((response) => {
      const connectedServices = response.data;

      store.dispatch(saveConnectedServices(connectedServices));
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const createFlow = (flowName, selectedServices, meta) => {
  return axios({
    url: `/v1/flows`,
    method: "post",
    data: {
      flowName,
      services: selectedServices,
      meta,
    },
  }).then((response) => {
    return true;
  });
};

export const getFlow = () => {
  return axios({
    url: `/v1/flows`,
    method: "get",
  });
};

export const onboard = (flow, emails) => {
  return axios({
    url: `/v1/onboard`,
    method: "post",
    data: {
      flow,
      emails,
    },
  });
};
