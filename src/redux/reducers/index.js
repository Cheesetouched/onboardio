import user from "./user";
import { combineReducers } from "@reduxjs/toolkit";

const combinedReducer = combineReducers({
    user
});

const rootReducer = (state, action) => {
        return combinedReducer(state, action);
};

export default rootReducer;
