import React from "react";
import { withRouter } from "react-router-dom";
import NavbarComp from "../Navbar/NavbarComp";
import KakaoMap from "../../containers/KakaoMap/KakaoMap";

function MainPage(props) {
  const userId = props.location.state;

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <NavbarComp userId={userId} history={props.history} />
      <KakaoMap />
    </div>
  );
}

export default withRouter(MainPage);
