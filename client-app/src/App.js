import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LandingPage from "./components/views/LadingPage/LadingPage";
import LoginSignup from "./components/views/LoginSignup/LoginSignup";
import MainPage from "./components/views/MainPage/MainPage";
import Auth from "./hoc/auth";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/loginSignup" component={Auth(LoginSignup, false)} />
        <Route exact path="/main" component={Auth(MainPage, true)} />
      </Switch>
    </Router>
  );
}

export default App;
