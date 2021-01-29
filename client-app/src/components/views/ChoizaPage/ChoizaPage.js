import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import NavbarComp from "../Navbar/NavbarComp";
import { youtubeURI } from "../../../config/dev";

function ChoizaPage(props) {
  const userId = props.location.state;

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?key=${youtubeURI}&channelId=UCgiO7Kxib0SZEG0DoeuBkdQ&part=snippet`
      )
      .then(response => {
        console.log(response);
      });
  });

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <NavbarComp userId={userId} history={props.history} />
      This is ChoizaPage
    </div>
  );
}

export default withRouter(ChoizaPage);
