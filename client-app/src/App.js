import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LandingPage from "./components/views/LadingPage/LadingPage";
import LoginSignup from "./components/views/LoginSignup/LoginSignup";
import MainPage from "./components/views/MainPage/MainPage";
import CurrentLocation from "./components/views/CurrentLocation/CurrentLocation";
import MarkerPage from "./components/views/MarkerPage/MarkerPage";
import WishPage from "./components/views/WishList/WishPage";
import ChoizaPage from "./components/views/ChoizaPage/ChoizaPage";
import Auth from "./hoc/auth";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/loginSignup" component={Auth(LoginSignup, false)} />
        <Route exact path="/main" component={Auth(MainPage, true)} />
        <Route
          exact
          path="/current-location"
          component={Auth(CurrentLocation, true)}
        />
        <Route exact path="/marker" component={Auth(MarkerPage, true)} />
        <Route exact path="/wish" component={Auth(WishPage, true)} />
        <Route exact path="/choizaroad" component={Auth(ChoizaPage, true)} />
      </Switch>
    </Router>
  );
}

export default App;
