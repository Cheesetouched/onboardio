import React from "react";
import { useColorMode, Box, IconButton } from "@chakra-ui/core";

const ThemeToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box textAlign="right" mr={2}>
      <IconButton
        icon={colorMode === "light" ? "moon" : "sun"}
        onClick={toggleColorMode}
        variant="outline"
        border="1px"
        bg="transparent"
      />
    </Box>
  );
};

export default ThemeToggler;
