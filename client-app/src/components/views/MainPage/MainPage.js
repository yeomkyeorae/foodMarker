import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import NavbarComp from "../Navbar/NavbarComp";
import KakaoMap from "../../containers/KakaoMap/KakaoMap";
import { Button } from "react-bootstrap";
import Carousel, { autoplayPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import styled from "styled-components";

const H2 = styled.h2`
  font-family: "Do Hyeon", sans-serif;
`;

function MainPage(props) {
  const userId = props.location.state;
  const [latitude, setLatitude] = useState(37.52393);
  const [longitude, setLongitude] = useState(126.980493);
  const [mapLevel, setMapLevel] = useState(8);

  const imgTmpUrl1 =
    "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
  const imgTmpUrl2 =
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80";
  const imgTmpUrl3 =
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";

  const onClickHandler = option => {
    if (option === 1) {
      // 영동군
      setLatitude(36.1746815);
      setLongitude(127.7830354);
      setMapLevel(13);
    } else if (option === 2) {
      // 국립중앙박물관
      setLatitude(37.52393);
      setLongitude(126.980493);
      setMapLevel(8);
    } else if (option === 3) {
      // 대전 용문역
      setLatitude(36.338262);
      setLongitude(127.392768);
      setMapLevel(8);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <NavbarComp userId={userId} history={props.history} />
      <hr />
      <H2>나의 맛집들</H2>
      <div>
        <Button
          variant="success"
          onClick={() => onClickHandler(1)}
          style={{ margin: "10px", display: "inline-block" }}
        >
          전국
        </Button>
        <Button
          variant="secondary"
          onClick={() => onClickHandler(2)}
          style={{ margin: "10px", display: "inline-block" }}
        >
          서울
        </Button>
        <Button
          variant="primary"
          onClick={() => onClickHandler(3)}
          style={{ margin: "10px", display: "inline-block" }}
        >
          대전
        </Button>
      </div>
      <KakaoMap latitude={latitude} longitude={longitude} mapLevel={mapLevel} />
      <hr />
      <div style={{ width: "50%", marginTop: "10px", margin: "auto" }}>
        <H2>평점 가장 높은 맛집 리스트</H2>
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
