import React from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  Link,
} from "@chakra-ui/core";

import ErrorMessage from "../components/ErrorMessage";

const SignUpSection = ({
  handleSubmit,
  error,
  handleChange,
  isLoading,
  toggleSignupLogin,
  email,
  password,
  confirmPassword,
}) => {
  return (
    <Box p={6} width={{ md: 300 }}>
      {/* Sign Up Page */}
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
              value={email}
            />
          </FormControl>
          <FormControl mt={6} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="*******"
              name="password"
              onChange={handleChange}
              value={password}
            />
          </FormControl>
          <FormControl mt={6} isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="*******"
              name="confirmPassword"
              onChange={handleChange}
              value={confirmPassword}
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
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
        <Box textAlign="center" mt={6}>
          <Link fontSize="xs" onClick={toggleSignupLogin}>
            Already with us? Sign In.
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpSection;
