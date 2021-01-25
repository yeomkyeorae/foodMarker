import React from "react";
import { withRouter } from "react-router-dom";
import NavbarComp from "../Navbar/NavbarComp";

function MainPage(props) {
  const userId = props.location.state;

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <NavbarComp userId={userId} history={props.history} />
      This is MainPage
    </div>
  );
}

export default withRouter(MainPage);
