import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { Box, Heading, Flex, Button, Link, Text } from "@chakra-ui/core";

import { signOutUser } from "../redux/actions/auth";
import { store } from "../redux/store";

import ThemeToggler from "./ThemeToggler";

const Navbar = (props) => {
  let cta = props.isLoggedIn ? "Sign Out" : "Sign In";
  const signOut = () => {
    alert("Sign Out!");
    window.localStorage.setItem("token", null);
    store.dispatch(signOutUser());
  };
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as={ReactLink} to="/" size="lg" fontFamily="Didact Gothic">
          <span role="img" aria-label="onboard">
            🚀
          </span>
          Onboard.io
        </Heading>
      </Flex>

      <Box
        display={{ sm: "flex", md: "flex" }}
        alignItems="center"
        justifyContent="flex-end"
        flexGrow={1}
      >
        <Link
          as={ReactLink}
          to="/"
          mr={6}
          style={{ textDecoration: "none" }}
          fontSize="lg"
        >
          <span role="img" aria-label="onboard">
            👨🏻‍💻{" "}
          </span>
          <span style={{ marginLeft: 8 }}>Dashboard</span>
        </Link>
        <Link
          as={ReactLink}
          to="/connect"
          mr={6}
          style={{ textDecoration: "none" }}
          fontSize="lg"
        >
          <span role="img" aria-label="onboard">
            ⚡{" "}
          </span>
          <span style={{ marginLeft: 8 }}>
            {" "}
            Connect +{`${props.isLoggedIn}`}
          </span>
        </Link>
      </Box>

      <Flex
        mt={{ base: 4, md: 0 }}
        align="center"
        justifyContent="space-between"
      >
        {/* Sign out here depending on what the CTA says */}
        {cta === "Sign Out" ? (
          <Button
            bg="transparent"
            variant="outline"
            border="1px"
            mr={6}
            onClick={() => signOut()}
          >
            {cta}
          </Button>
        ) : (
          <Button
            bg="transparent"
            variant="outline"
            border="1px"
            mr={6}
            as={ReactLink}
            to="/auth"
          >
            {cta}
          </Button>
        )}
      </Flex>
      <ThemeToggler />
    </Flex>
  );
};

export default Navbar;
