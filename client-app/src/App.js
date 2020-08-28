import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./components/views/LadingPage/LadingPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
}

export default App;
