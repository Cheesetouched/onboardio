import user from "./user";
import services from "./services";
import { combineReducers } from "@reduxjs/toolkit";

const combinedReducer = combineReducers({
    user,
    services
});

const rootReducer = (state, action) => {
        return combinedReducer(state, action);
};

export default rootReducer;
