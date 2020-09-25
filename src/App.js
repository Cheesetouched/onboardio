import React from "react";
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/core";

import "./App.css";

import ThemeToggler from "./components/ThemeToggler";
import LoginForm from "./pages/LoginForm";
import Integrate from "./pages/Integrate";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <ThemeToggler />
        <Integrate />
        {/* <LoginForm /> */}
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
