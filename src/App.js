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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <ThemeToggler />
        <LoginForm />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
