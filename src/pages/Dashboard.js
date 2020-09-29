import React from "react";
import axios from "axios";
import { Flex, Box, Button, Heading } from "@chakra-ui/core";
import { Link as ReactLink } from "react-router-dom";

const Dashboard = () => {
  const token = window.localStorage.getItem("token");
  axios.defaults.headers["Authorization"] = token;
  return (
    <Flex
      width="full"
      align="center"
      justifyContent="center"
      direction="column"
      height="60vh"
    >
      <Box>
        <Heading m={50}>
          Onboarding Has Never Been This Easy{" "}
          <span role="img" aria-label="onboard">
            ✨
          </span>
        </Heading>
        <Flex
          width="full"
          align="center"
          justifyContent="center"
          direction="row"
        >
          <Button
            m={5}
            mt={4}
            p={6}
            type="submit"
            variantColor="teal"
            variant="outline"
            as={ReactLink}
            to="/flow/create"
          >
            Create a Workflow
          </Button>
          <Button
            m={5}
            mt={4}
            p={6}
            type="submit"
            variantColor="teal"
            variant="outline"
            as={ReactLink}
            to="/onboard"
          >
            Onboard Teammate
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Dashboard;
