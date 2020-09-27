import React, { useState } from "react";
import { Flex, Box } from "@chakra-ui/core";

import SignUpSection from "../components/SignUp";
import SignInSection from "../components/SignIn";
import { loginUserService, registerUserService } from "../services/auth";
import { withRouter } from "react-router-dom";

const AuthForm = ({ history }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    isLoading: false,
    error: null,
    signUp: true,
  });
  const { email, password, confirmPassword, signUp } = state;

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setState({ ...state, error: "Passwords don't match!" });
    } else {
      return registerUserService(email, password)
        .then((res) => {
          const { status, token, message } = res;
          if (status === "USER_REGISTERED") {
            setState({ ...state, error: null });
            history.push(`/connect`);
          } else {
            setState({ ...state, error: message });
          }
        })
        .catch((error) => {
          setState({ ...state, error: "Something went wrong" });
        });
    }
  };

  const handleLogin = () => {
    return loginUserService(email, password)
      .then((res) => {
        const { status, token, message } = res;

        if (status === "LOGGED_IN") {
          setState({ ...state, error: null });
          history.push(`/`);
        } else {
          setState({ ...state, error: message });
        }
      })
      .catch((err) => {
        setState({ ...state, error: "Something went wrong! Please try again" });
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (signUp) {
      return handleSignup();
    } else {
      return handleLogin();
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setState({ ...state, [name]: value });
  };

  const toggleSignupLogin = () => {
    setState({ ...state, signUp: !signUp });
  };

  const props = {
    handleSubmit,
    handleChange,
    toggleSignupLogin,
    ...state,
  };
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        mt={10}
      >
        {signUp ? <SignUpSection {...props} /> : <SignInSection {...props} />}
      </Box>
    </Flex>
  );
};

export default withRouter(AuthForm);
