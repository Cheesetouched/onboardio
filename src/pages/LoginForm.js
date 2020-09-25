import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  Text,
  Link,
} from "@chakra-ui/core";

import ErrorMessage from "../components/ErrorMessage";

const LoginForm = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    isLoading: false,
    error: "",
    signUp: true,
  });
  const { email, confirmPassword, password, isLoading, error, signUp } = state;

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Email: ${email} & Password: ${password}`);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setState({ ...state, [name]: value });
  };

  const switchMode = () => {
    setState({ ...state, signUp: !signUp });
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        {signUp ? (
          <Box p={2}>
            {/* Sign In Page */}
            <Box textAlign="center">
              <Heading>Get started</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form onSubmit={handleSubmit}>
                {error ? <ErrorMessage message={error} /> : null}
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="someone@somewhere.com"
                    name="email"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mt={6} isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="*******"
                    name="password"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mt={6} isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="*******"
                    name="confirmPassword"
                    onChange={handleChange}
                  />
                </FormControl>
                <Button
                  width="full"
                  mt={4}
                  type="submit"
                  variantColor="teal"
                  variant="outline"
                >
                  {isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="teal"
                    />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
              <Box textAlign="center" mt={6}>
                <Link fontSize="xs" onClick={switchMode}>
                  Already with us? Sign In.
                </Link>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box p={2}>
            {/* Sign In Page */}
            <Box textAlign="center">
              <Heading>Welcome Back</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form onSubmit={handleSubmit}>
                {error ? <ErrorMessage message={error} /> : null}
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="someone@somewhere.com"
                    name="email"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mt={6} isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="*******"
                    name="password"
                    onChange={handleChange}
                  />
                </FormControl>
                <Button
                  width="full"
                  mt={4}
                  type="submit"
                  variantColor="teal"
                  variant="outline"
                >
                  {isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="teal"
                    />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
              <Box textAlign="center" mt={6}>
                <Link fontSize="xs" onClick={switchMode}>
                  First Time? Sign Up.
                </Link>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default LoginForm;
