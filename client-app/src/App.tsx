import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LandingPage from "./pages/LadingPage/LadingPage";
import LoginSignup from "./pages/LoginSignup/LoginSignup";
import MainPage from "./pages/MainPage/MainPage";
import CurrentLocation from "./pages/CurrentLocation/CurrentLocation";
import MarkerPage from "./pages/MarkerPage/MarkerPage";
import WishPage from "./pages/WishList/WishPage";
import ChoizaPage from "./pages/ChoizaPage/ChoizaPage";
import MyInfoPage from "./pages/MyInfo/MyInfoPage";
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
        <Route exact path="/my-info" component={Auth(MyInfoPage, true)} />
      </Switch>
    </Router>
  );
}

export default App;
