import React, { useState } from "react";
import { Flex, Box } from "@chakra-ui/core";

import SignUpSection from "../components/SignUp";
import SignInSection from "../components/SignIn";
import {loginUser} from "../services/auth";

const LoginForm = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    isLoading: false,
    error: null,
    signUp: true,
  });
  const { email, password, confirmPassword, signUp } = state;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (signUp && password !== confirmPassword) {
      setState({ ...state, error: "Passwords don't match!" });
    } else {
      setState({ ...state, error: null });

      loginUser(email, password).then(res=> {
        const {status, token} = res;
        if(status === "LOGGED_IN"){
          alert(token);
        }
        alert("Sent request");
      }).catch((err)=>{
        console.error(err);
      });
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

export default LoginForm;
