import React from 'react'
import { createStore, applyMiddleware, compose, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunkMiddleware from "redux-thunk";

import rootReducer from './reducers'

const middlewareEnhancer = applyMiddleware(logger, thunkMiddleware);

const composeEnhancers =
    typeof window === "object" && window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]
        ? window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]({})
        : compose;

const composedEnhancers = composeEnhancers(middlewareEnhancer)

const store = createStore(rootReducer, {user: {isLoggedIn: false, token: null}}, composedEnhancers)

export { store };
