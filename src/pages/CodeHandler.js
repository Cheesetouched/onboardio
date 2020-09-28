import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router";
import { Flex, Spinner } from "@chakra-ui/core";

import ErrorMessage from "../components/ErrorMessage";

import { sendCode } from "../services/query";
import { getQueryParams } from "../utils/url";

const CodeHandler = ({ token }) => {
  const [state, setState] = useState({
    error: null,
    isLoading: true,
  });
  const { service } = useParams();

  const params = getQueryParams();
  const code = params.code;
  const accounts_server = params["accounts-server"];
  useEffect(() => {
    sendCode(service, code, token, accounts_server)
      .then(async (response) => {
        if (response.status === 200) {
          setState((state) => ({ ...state, isLoading: false, error: null }));
        } else {
          setState((state) => ({ ...state, error: response.message }));
        }
      })
      .catch((err) => {
        setState((state) => ({
          ...state,
          error: "Couldn't connect to the service!",
        }));
      });
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

const mapStateToProps = (state) => {
  const { user } = state;
  return { token: user.token };
};

export default connect(mapStateToProps, null)(CodeHandler);
