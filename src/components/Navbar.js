import React from "react";
import { Box, Heading, Flex, Button, Link } from "@chakra-ui/core";
import ThemeToggler from "./ThemeToggler";

const Navbar = (props) => {
  let { cta } = props;
  // Temporary Value
  cta = "Sign Out";
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
        <Heading as="h1" size="xl" fontFamily="Raleway">
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
        <Link mr={6}>Dashboard</Link>
        <Link mr={6}>Connect</Link>
      </Box>

      <Flex
        mt={{ base: 4, md: 0 }}
        align="center"
        justifyContent="space-between"
      >
        <Button bg="transparent" border="1px" mr={6}>
          {cta}
        </Button>
      </Flex>
      <ThemeToggler />
    </Flex>
  );
};

export default Navbar;
