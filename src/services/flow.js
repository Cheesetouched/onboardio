import axios from "axios";
import {store} from "../redux/store";
import {saveConnectedServices} from "../redux/actions/services";

export const fetchConnectedServicesList = () =>{
    return axios({
        url: `/v1/services/`,
        method: "get"
    }).then((response)=>{
        const connectedServices = response.data;

        store.dispatch(saveConnectedServices(connectedServices));
        return response.data;
    }).catch((error)=>{
        return error.response.data;
    });
}

export const createFlow = (flowName, selectedServices, meta) => {
    return axios({
        url: `/v1/flows/create`,
        method: "post",
        data: {
            flowName,
            services: selectedServices,
            meta
        }
    }).then((response)=>{
        return true;
    });
};
