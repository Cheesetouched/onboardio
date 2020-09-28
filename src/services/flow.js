import axios from "axios";
import {store} from "../redux/store";
import {saveConnectedServices} from "../redux/actions/user";

export const fetchConnectedServicesList = () =>{
    return axios({
        url: `/v1/services/`,
        method: "get"
    }).then((response)=>{
        const connectedServices = response.data;
        if(!Array.isArray(connectedServices)) {
            throw new Error("Invalid response");
        }
        store.dispatch(saveConnectedServices(connectedServices));
        return response.data;
    }).catch((error)=>{
        return error.response.data;
    });
}