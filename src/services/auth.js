import {resolvePathToBackend} from "../utils/url";

export function loginUser(email, password){
    return fetch(resolvePathToBackend("/v1/auth/login"), {
       method: "POST",
       body: JSON.stringify({
           email: email,
           password: password
       }),
    }).then(res => (res.json()));
}
