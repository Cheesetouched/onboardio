import React, { useState } from "react";
import { Flex, Box, Button, Text, Heading } from "@chakra-ui/core";
import { SiGithub, SiDiscord, SiHeroku, SiZoom, SiAsana } from "react-icons/si";
import { CLIENT_URL, DISCORD_URL } from "../constants";

const Integrate = () => {
  const [state, setState] = useState({
    github: false,
    zoom: true,
    discord: false,
    asana: false,
    heroku: false,
  });
  const { github, zoom, discord, asana, heroku } = state;
  const {
    REACT_APP_GITHUB_CLIENT_ID,
    REACT_APP_DISCORD_CLIENT_ID,
    REACT_APP_HEROKU_CLIENT_ID,
    REACT_APP_ASANA_CLIENT_ID,
    REACT_APP_ZOOM_CLIENT_ID,
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
        text={SiGithub}
        active={github}
        label="Github"
        url={`https://github.com/login/oauth/authorize?scope=admin:org&client_id=${REACT_APP_GITHUB_CLIENT_ID}`}
      />
      <IntegrationCard
        text={SiZoom}
        active={zoom}
        label="Zoom"
        url={`https://zoom.us/oauth/authorize?response_type=code&client_id=${REACT_APP_ZOOM_CLIENT_ID}&redirect_uri=${CLIENT_URL}authorize/zoom`}
      />
      <IntegrationCard
        text={SiDiscord}
        active={discord}
        label="Discord"
        url={`https://discord.com/api/oauth2/authorize?client_id=${REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=${DISCORD_URL}authorize%2Fdiscord&response_type=code&scope=guilds.join`}
      />
      <IntegrationCard
        text={SiAsana}
        active={asana}
        label="Asana"
        url={`https://app.asana.com/-/oauth_authorize?client_id=${REACT_APP_ASANA_CLIENT_ID}&redirect_uri=${CLIENT_URL}authorize/asana&response_type=code`}
      />
      <IntegrationCard
        text={SiHeroku}
        active={heroku}
        label="Heroku"
        url={`https://id.heroku.com/oauth/authorize?client_id=${REACT_APP_HEROKU_CLIENT_ID}&response_type=code&scope=global&state=${REACT_APP_ANTI_FORGERY}`}
      />
    </Flex>
  );
};

const IntegrationCard = ({ text, active, url, color = null }) => (
  <Box
    p={4}
    m={3}
    maxWidth="350px"
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
