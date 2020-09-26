import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router";
import { Flex, Box, Button, Heading, Spinner } from "@chakra-ui/core";
import { Link as ReactLink } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage";

import { sendCode } from "../utils/query";

const CodeHandler = () => {
  const [state, setState] = useState({
    error: null,
    isLoading: true,
  });
  const { service } = useParams();
  const getQueryParams = () =>
    window.location.search
      .replace("?", "")
      .split("&")
      .reduce(
        (r, e) => (
          (r[e.split("=")[0]] = decodeURIComponent(e.split("=")[1])), r
        ),
        {}
      );
  const { code } = getQueryParams();
  //Dummy JWT token
  const token = "ada214142zxczcz213124241";
  useEffect(() => {
    async function postCode() {
      sendCode(service, code, token)
        .then(async (response) => {
          response = await response.json();
          if (response.message) {
            setState((state) => ({ ...state, error: response.message }));
          } else {
            setState((state) => ({ ...state, isLoading: false }));
          }
        })
        .catch(
          setState((state) => ({
            ...state,
            error: "Couldn't connect to the service!",
          }))
        );
    }
    postCode();
  }, [code, service, token]);
  const { error, isLoading } = state;
  return (
    <Flex
      width="full"
      align="center"
      justifyContent="center"
      direction="column"
      height="80vh"
    >
      {error ? (
        <ErrorMessage message={error} />
      ) : isLoading ? (
        <Spinner size="xl" speed="0.50s" color="teal.500" />
      ) : (
        <Redirect to="/connect" />
      )}
    </Flex>
  );
};

export default CodeHandler;
