import axios from "axios";
import {store} from "../redux/store";
import {setUserAuthState} from "../redux/actions/auth";

export const loginUser = (email, password) => {
    return axios({
        url: `/v1/auth/login`,
        method: "post",
        data: {
            email: email,
            password: password
        }
    }).then((response)=>{
        const {status, token, message} = response.data;
        if (status === "LOGGED_IN") {
            window.localStorage.setItem("token", token);
            store.dispatch(setUserAuthState(true, token));
        }

        return response.data;
    }).catch(async (error)=>{
        return error.response.data;
    });
}

export const registerUser = (email, password) => {
    return axios({
        url: `/v1/auth/register`,
        method: "post",
        data: {
            email: email,
            password: password
        }
    }).then((response)=>{
        const {status, token, message} = response.data;
        if(status === "USER_REGISTERED") {
            window.localStorage.setItem("token", token);
            store.dispatch(setUserAuthState(true, token));
        }
        return response.data;
    });
}
