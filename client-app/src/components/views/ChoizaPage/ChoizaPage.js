import React from "react";
import { withRouter } from "react-router-dom";
import NavbarComp from "../Navbar/NavbarComp";

function ChoizaPage(props) {
  const userId = props.location.state;

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <NavbarComp userId={userId} history={props.history} />
    </div>
  );
}

export default withRouter(ChoizaPage);
