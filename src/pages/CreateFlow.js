import React, { useCallback, useState } from "react";
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

const CreateFlow = () => {
  const [state, setState] = useState({
    flowName: "",
    selectedServices: [],
    isLoading: false,
    error: null,
  });

  // THis will need to be fetched from backend.
  const servicesAvailable = [
    { name: "Github", id: 1 },
    { name: "MongoDb", id: 2 },
    { name: "Discord", id: 3 },
    { name: "Trello", id: 4 },
    { name: "Heroku", id: 5 },
  ];

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
    console.log(value);
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
          {/* Sign In Page */}
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
                  mode={"dark"}
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
