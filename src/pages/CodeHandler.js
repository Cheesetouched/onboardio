import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router";
import { Flex, Spinner } from "@chakra-ui/core";

import ErrorMessage from "../components/ErrorMessage";

import { sendCode } from "../services/query";
import { getQueryParams } from "../utils/url";

const CodeHandler = () => {
  const [state, setState] = useState({
    error: null,
    isLoading: true,
  });
  const { service } = useParams();

  const { code } = getQueryParams();
  //Dummy JWT token
  const token = "ada214142zxczcz213124241";
  useEffect(() => {
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
