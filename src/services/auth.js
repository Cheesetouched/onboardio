import axios from "axios";

export const loginUser = (email, password) => {
    return axios({
        url: `/v1/auth/login`,
        method: "post",
        data: {
            email: email,
            password: password
        }
    }).then((response)=>{
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
        return response.data;
    }).catch(async (error)=>{
        return error;
    });
}
