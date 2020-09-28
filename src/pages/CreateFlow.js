import React, {useCallback, useEffect, useState} from "react";
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
} from "@chakra-ui/core";
import ErrorMessage from "../components/ErrorMessage";
import { MultiSelect } from "../components/MultiSelect";
import {fetchConnectedServicesList} from "../services/flow";
import {useSelector} from "react-redux";
import {getConnectedServices} from "../redux/stateUtils/user";

const STEPS = {
  CREATE_FLOW_FORM: "CREATE_FLOW_FORM",
  GITHUB_USER_INPUT_FORM: "GITHUB_USER_INPUT_FORM",
  ASANA_USER_INPUT_FORM: "ASANA_USER_INPUT_FORM",
  DISCORD_USER_INPUT_FORM: "DISCORD_USER_INPUT_FORM",
  HEROKU_USER_INPUT_FORM: "HEROKU_USER_INPUT_FORM"
};

const CreateFlow = (props) => {
  const [state, setState] = useState({
    flowName: "",
    selectedServices: [],
    servicesInputs: {},
    currentStep: STEPS.CREATE_FLOW_FORM,
    isLoading: false,
    error: null,
  });

  const servicesAvailable = useSelector(getConnectedServices);

  useEffect(()=>{
    fetchConnectedServicesList();
  }, [])

  const serviceOptions = servicesAvailable.map((service) => {
    return { label: service.name, value: service.id };
  });

  const { flowName, selectedServices, error, isLoading } = state;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (flowName !== "" && selectedServices.length > 0) {
      setState({ ...state, error: null });
      alert(`Creating a flow now`);
    } else {
      const errorMessage =
        flowName === "" ? "Empty flow name provided" : "No services selected";
      setState({ ...state, error: errorMessage });
    }
  };

  const handleFlowNameChange = (event) => {
    const { value, name } = event.target;

    setState({ ...state, flowName: value });
  };

  const handleSelectedServicesChange = (value) => {
    setState({ ...state, selectedServices: value });
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="500px"
        width={440}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        mt={10}
      >
        <Box p={2} pb={0}>
          {/* Create Flow Page */}
          <Box textAlign="center">
            <Heading>Create New Flow</Heading>
          </Box>
          <Box my={8} mb={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              {error ? <ErrorMessage message={error} /> : null}
              <FormControl isRequired>
                <FormLabel>Flow Name</FormLabel>
                <Input
                  type="text"
                  mt={2}
                  placeholder="Enter the name of the flow"
                  name="flow_name"
                  onChange={handleFlowNameChange}
                  value={flowName}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel mt={4} mb={2}>
                  Services in the flow
                </FormLabel>
                <MultiSelect
                  onChange={handleSelectedServicesChange}
                  options={serviceOptions}
                  values={selectedServices}
                  placeholder={"Select your services"}
                />
              </FormControl>
              <Button
                width="full"
                mt={8}
                type="submit"
                variantColor="teal"
                variant="outline"
              >
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  "Create Flow"
                )}
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default CreateFlow;
