import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/core";

import "./App.css";

import AuthForm from "./pages/AuthForm";
import Integrate from "./pages/Integrate";
import Dashboard from "./pages/Dashboard";

import Navbar from "./components/Navbar";
import CreateFlow from "./pages/CreateFlow";
import Onboard from "./pages/Onboard";
import CodeHandler from "./pages/CodeHandler";
import {setUserAuthState} from "./redux/actions/auth";
import AuthorizedRoute from "./components/AuthorizedRoute";
import {store} from "./redux/store";
import {useSelector} from "react-redux";
import {checkIfUserLoggedIn} from "./redux/stateUtils/user";

function App({ currentUser = false }) {
  const isLoggedIn = useSelector(checkIfUserLoggedIn);

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Navbar />
        <Switch>
          <AuthorizedRoute exact path="/" component={Dashboard} />
          <AuthorizedRoute exact path="/connect" component={Integrate} />
          <AuthorizedRoute exact path="/flow/create" component={CreateFlow} />
          <AuthorizedRoute exact path="/onboard" component={Onboard} />
          <AuthorizedRoute exact path="/authorize/:service" component={CodeHandler} />

          <Route
            exact
            path="/auth"
            render={() => (isLoggedIn ? <Redirect to="/" /> : <AuthForm />)}
          />
        </Switch>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
