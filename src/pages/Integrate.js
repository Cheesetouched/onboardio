import React, { useState } from "react";
import { Flex, Box, Button, Text } from "@chakra-ui/core";
import { GoLogoGithub } from "react-icons/go";
import { SiDiscord, SiHeroku, SiFigma, SiAsana } from "react-icons/si";

const Integrate = () => {
  const [state, setState] = useState({
    a: false,
    b: true,
    c: false,
    d: false,
    e: false,
  });
  const { a, b, c, d, e } = state;
  const {
    REACT_APP_GITHUB_CLIENT_ID,
    REACT_APP_DISCORD_CLIENT_ID,
    REACT_APP_HEROKU_CLIENT_ID,
    REACT_APP_FIGMA_CLIENT_ID,
    REACT_APP_ANTI_FORGERY,
  } = process.env;
  return (
    <Flex
      width="full"
      align="center"
      justifyContent="center"
      direction="column"
    >
      <IntegrationCard
        text={GoLogoGithub}
        active={a}
        url={`https://github.com/login/oauth/authorize?scope=admin:org&client_id=${REACT_APP_GITHUB_CLIENT_ID}`}
      />
      <IntegrationCard text={SiFigma} active={b} />
      <IntegrationCard
        text={SiDiscord}
        active={c}
        url={`https://discord.com/api/oauth2/authorize?client_id=${REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fdiscord-auth&response_type=code&scope=guilds%20guilds.join%20identify%20email`}
      />
      <IntegrationCard text={SiAsana} active={d} />
      <IntegrationCard
        text={SiHeroku}
        active={e}
        url={`https://id.heroku.com/oauth/authorize?client_id=${REACT_APP_HEROKU_CLIENT_ID}&response_type=code&scope=global&state=${REACT_APP_ANTI_FORGERY}`}
      />
    </Flex>
  );
};

const IntegrationCard = ({ text, active, color = null, url }) => (
  <Box
    p={4}
    m={3}
    maxWidth="500px"
    borderWidth={1}
    borderRadius={8}
    boxShadow="lg"
    width="full"
  >
    <Flex align="center" justifyContent="space-between">
      <Box as={text} size="64px" color={color} />
      <a href={url}>
        <Button
          mt={4}
          type="submit"
          variantColor={active ? "green" : "teal"}
          variant={active ? "solid" : "outline"}
        >
          {active ? "Connected" : "Connect"}
        </Button>
      </a>
    </Flex>
  </Box>
);

export default Integrate;
