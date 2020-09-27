import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Flex, Box, Button, Spinner } from "@chakra-ui/core";
import { SiGithub, SiDiscord, SiHeroku, SiZoom, SiAsana } from "react-icons/si";
import { CLIENT_URL, DISCORD_URL } from "../constants";

import ErrorMessage from "../components/ErrorMessage";

import { getServices } from "../services/query";

const Integrate = ({ token }) => {
  const [state, setState] = useState({
    GitHub: false,
    Zoom: false,
    Discord: false,
    Asana: false,
    Heroku: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    getServices(token)
      .then(async (response) => {
        response = response.data;
        response.forEach((element) => {
          setState((state) => ({ ...state, [element.name]: true }));
        });
        setState((state) => ({ ...state, isLoading: false, error: null }));
        console.log(response);
        if (response.status !== 200) {
          setState((state) => ({ ...state, error: response.message }));
        }
      })
      .catch((err) => {
        console.log(err);
        setState((state) => ({
          ...state,
          error: "Couldn't connect to the service!",
        }));
      });
  }, []);

  const { GitHub, Zoom, Discord, Asana, Heroku, error, isLoading } = state;
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
      {error ? (
        <ErrorMessage message={error} />
      ) : isLoading ? (
        <Spinner size="xl" speed="0.50s" color="teal.500" />
      ) : (
        <>
          <IntegrationCard
            text={SiGithub}
            active={GitHub}
            label="Github"
            url={`https://github.com/login/oauth/authorize?scope=admin:org&client_id=${REACT_APP_GITHUB_CLIENT_ID}`}
          />
          <IntegrationCard
            text={SiZoom}
            active={Zoom}
            label="Zoom"
            url={`https://zoom.us/oauth/authorize?response_type=code&client_id=${REACT_APP_ZOOM_CLIENT_ID}&redirect_uri=${CLIENT_URL}authorize/zoom`}
          />
          <IntegrationCard
            text={SiDiscord}
            active={Discord}
            label="Discord"
            url={`https://discord.com/api/oauth2/authorize?client_id=${REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=${DISCORD_URL}authorize%2Fdiscord&response_type=code&scope=guilds.join`}
          />
          <IntegrationCard
            text={SiAsana}
            active={Asana}
            label="Asana"
            url={`https://app.asana.com/-/oauth_authorize?client_id=${REACT_APP_ASANA_CLIENT_ID}&redirect_uri=${CLIENT_URL}authorize/asana&response_type=code`}
          />
          <IntegrationCard
            text={SiHeroku}
            active={Heroku}
            label="Heroku"
            url={`https://id.heroku.com/oauth/authorize?client_id=${REACT_APP_HEROKU_CLIENT_ID}&response_type=code&scope=global&state=${REACT_APP_ANTI_FORGERY}`}
          />
        </>
      )}
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

const mapStateToProps = (state) => {
  const { user } = state;
  return { token: user.token };
};

export default connect(mapStateToProps, null)(Integrate);
