import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/core";

import "./App.css";

import LoginForm from "./pages/LoginForm";
import Integrate from "./pages/Integrate";
import Navbar from "./components/Navbar";

function App({ currentUser = false }) {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => <p>Dashboard</p>} />
          <Route
            exact
            path="/auth"
            render={() => (currentUser ? <Redirect to="/" /> : <LoginForm />)}
          />
          <Route exact path="/connect" component={Integrate} />
        </Switch>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
