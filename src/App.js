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
import Dashboard from "./pages/Dashboard";

import Navbar from "./components/Navbar";
import CreateFlow from "./pages/CreateFlow";
import Onboard from "./pages/Onboard";

function App({ currentUser = false }) {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/flow/create" component={CreateFlow} />
          <Route exact path="/onboard" component={Onboard} />
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
