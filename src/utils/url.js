import url from "url";
import {BACKEND_SERVER_URL} from "../constants";

export function resolvePathToBackend(path){
    return url.resolve(BACKEND_SERVER_URL, path);
}
