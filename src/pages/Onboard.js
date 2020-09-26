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
import { SingleSelect } from "../components/SingleSelect";
import { CreatableMultiValueInput } from "../components/CreatableMultiValueInput";
import { isEmailValid } from "../utils/email";

const Onboard = (props) => {
  const [state, setState] = useState({
    selectedFlow: null,
    isLoading: false,
    onboardingEmails: null,
    error: null,
  });

  const { selectedFlow, onboardingEmails, error, isLoading } = state;

  const selectFlowOptions = [
    { label: "Software Intern", value: 1 },
    { label: "Senior Backend Engineer", value: 2 },
    { label: "Senior Frontend Engineer", value: 3 },
    { label: "Junior Backend Engineer", value: 4 },
    { label: "Junior Frontend Engineer", value: 5 },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    const areAllEmailsValid = onboardingEmails
      ? onboardingEmails.filter((email) => {
          return !isEmailValid(email.value);
        }).length === 0
      : false;

    if (areAllEmailsValid && selectedFlow) {
      setState({ ...state, error: null });
      alert("Onboarding the users");
    } else {
      setState({
        ...state,
        error: !areAllEmailsValid
          ? "All emails are not valid"
          : "No flow selected",
      });
    }
  };

  const handleOnboardFlowChange = (value) => {
    setState({ ...state, selectedFlow: value });
  };

  const handleEmailAddressChange = (emails) => {
    const invalidEmailAddresses = emails
      ? emails.filter((email) => {
          return !isEmailValid(email.value);
        })
      : [];

    if (invalidEmailAddresses.length > 0) {
      setState({ ...state, error: "Invalid email address entered" });
    } else {
      setState({ ...state, onboardingEmails: emails, error: null });
    }
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
          {/* Onboard Page */}
          <Box textAlign="center">
            <Heading>Onboard Users</Heading>
          </Box>
          <Box my={8} mb={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              {error ? <ErrorMessage message={error} /> : null}
              <FormControl isRequired>
                <FormLabel>Select Flow</FormLabel>
                <SingleSelect
                  onChange={handleOnboardFlowChange}
                  options={selectFlowOptions}
                  value={selectedFlow}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel mt={4} mb={2}>
                  Email addresses to send invite
                </FormLabel>
                <CreatableMultiValueInput
                  onChange={handleEmailAddressChange}
                  values={onboardingEmails}
                  placeholder={"Enter email addresses"}
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
                  "Onboard"
                )}
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Onboard;
