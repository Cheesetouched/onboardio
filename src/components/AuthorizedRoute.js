import React, {useState} from 'react'
import { Redirect, Route } from 'react-router-dom'
import {useSelector} from "react-redux";
import {checkIfUserLoggedIn} from "../redux/stateUtils/user";

const AuthorizedRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = useSelector(checkIfUserLoggedIn);

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
                )
            }
        />
    )
}

export default AuthorizedRoute;
