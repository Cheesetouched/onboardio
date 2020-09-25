import React, { useState } from "react";
import { Flex, Box, Button, Text } from "@chakra-ui/core";
import { GoLogoGithub } from "react-icons/go";
import { DiMongodb } from "react-icons/di";
import { SiDiscord, SiTrello, SiHeroku } from "react-icons/si";

const Integrate = () => {
  const [state, setState] = useState({
    a: false,
    b: true,
    c: false,
    d: false,
    e: false,
  });
  const { a, b, c, d, e } = state;

  return (
    <Flex
      width="full"
      align="center"
      justifyContent="center"
      direction="column"
    >
      <IntegrationCard text={GoLogoGithub} active={a} />
      <IntegrationCard text={DiMongodb} active={b} />
      <IntegrationCard text={SiDiscord} active={c} />
      <IntegrationCard text={SiTrello} active={d} />
      <IntegrationCard text={SiHeroku} active={e} />
    </Flex>
  );
};

const IntegrationCard = ({ text, active, color = null }) => (
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
      <Button
        mt={4}
        type="submit"
        variantColor={active ? "green" : "teal"}
        variant={active ? "solid" : "outline"}
        isDisabled={active}
      >
        {active ? "Connected" : "Connect"}
      </Button>
    </Flex>
  </Box>
);

export default Integrate;
