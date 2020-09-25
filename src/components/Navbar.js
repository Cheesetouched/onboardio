import React from "react";
import { Link as ReactLink, Redirect } from "react-router-dom";
import { Box, Heading, Flex, Button, Link } from "@chakra-ui/core";
import ThemeToggler from "./ThemeToggler";

const Navbar = (props) => {
  let { cta } = props;
  // Temporary Value
  cta = "Sign Out";
  const signOut = () => {
    alert("Sign Out!");
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
        <Heading as={ReactLink} to="/" size="lg" fontFamily="Raleway">
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
        <Link as={ReactLink} to="/" mr={6} style={{ textDecoration: "none" }}>
          Dashboard
        </Link>
        <Link
          as={ReactLink}
          to="/connect"
          mr={6}
          style={{ textDecoration: "none" }}
        >
          Connect
        </Link>
      </Box>

      <Flex
        mt={{ base: 4, md: 0 }}
        align="center"
        justifyContent="space-between"
      >
        {cta === "Sign Out" ? (
          <Button
            bg="transparent"
            border="1px"
            mr={6}
            onClick={() => (cta === "Sign Out" ? signOut() : null)}
          >
            {/* Sign out here depending on what the CTA says */}
            {cta}
          </Button>
        ) : (
          <Button
            bg="transparent"
            border="1px"
            mr={6}
            as={ReactLink}
            to="/auth"
          >
            {/* Sign out here depending on what the CTA says */}
            {cta}
          </Button>
        )}
      </Flex>
      <ThemeToggler />
    </Flex>
  );
};

export default Navbar;
