import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import LandingPage from "./components/views/LadingPage/LadingPage";
import LoginSignup from "./components/views/LoginSignup/LoginSignup";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/loginSignup" component={LoginSignup} />
      </Switch>
    </Router>
  );
}

export default App;
