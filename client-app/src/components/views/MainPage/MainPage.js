import React from "react";
import { withRouter } from "react-router-dom";
import NavbarComp from "../Navbar/NavbarComp";
import KakaoMap from "../../containers/KakaoMap/KakaoMap";
import Carousel, { autoplayPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

function MainPage(props) {
  const userId = props.location.state;
  const imgTmpUrl1 =
    "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
  const imgTmpUrl2 =
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80";
  const imgTmpUrl3 =
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <NavbarComp userId={userId} history={props.history} />
      <hr />
      <h2>나의 맛집들</h2>
      <KakaoMap />
      <hr />
      <div style={{ width: "50%", marginTop: "10px", margin: "auto" }}>
        <h2>평점 가장 높은 맛집 리스트</h2>
        <Carousel
          autoPlay={2000}
          animationSpeed={1000}
          infinite
          plugins={[
            "infinite",
            {
              resolve: autoplayPlugin,
              options: {
                interval: 2000
              }
            }
          ]}
          // animationSpeed={1000}
        >
          <img src={imgTmpUrl1} alt="" width="500px" />
          <img src={imgTmpUrl2} alt="" width="500px" />
          <img src={imgTmpUrl3} alt="" width="500px" />
        </Carousel>
      </div>
      <br />
    </div>
  );
}

export default withRouter(MainPage);
