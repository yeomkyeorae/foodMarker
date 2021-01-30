import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import NavbarComp from "../Navbar/NavbarComp";
import { youtubeURI } from "../../../config/dev";

function ChoizaPage(props) {
  const userId = props.location.state;
  const [choizaItem, setChoizaItem] = useState("");

  useEffect(() => {
    // axios
    //   .get(
    //     `https://www.googleapis.com/youtube/v3/search?key=${youtubeURI}&channelId=UCgiO7Kxib0SZEG0DoeuBkdQ&part=snippet&maxResults=20`
    //   )
    //   .then(response => {
    //     console.log(response);
    //     setChoizaItem(response.data.items);
    //     console.log(choizaItem);
    //   });
  });

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <NavbarComp userId={userId} history={props.history} />
      This is ChoizaPage
      {/* {choizaItem.map(item => (
        <h1>item.snippet.title</h1>
      ))} */}
    </div>
  );
}

export default withRouter(ChoizaPage);
