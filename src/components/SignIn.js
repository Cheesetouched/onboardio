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
const SignInSection = ({
  handleSubmit,
  error,
  handleChange,
  isLoading,
  toggleSignupLogin,
  email,
  password,
}) => {
  return (
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
              "Sign In"
            )}
          </Button>
        </form>
        <Box textAlign="center" mt={6}>
          <Link fontSize="xs" onClick={toggleSignupLogin}>
            First Time? Sign Up.
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInSection;
