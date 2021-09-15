import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import NavbarComp from "../Navbar/NavbarComp";
import Footer from "../Footer/Footer";
import KakaoMapCoords from "../../containers/KakaoMap/KakaoMapCoords";

function CurrentLocation(props) {
  const userId = props.location.state;

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongtitude] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      //위치 정보
      navigator.geolocation.getCurrentPosition(
        pos => {
          setLatitude(pos.coords.latitude);
          setLongtitude(pos.coords.longitude);
        },
        () => {},
        { enableHighAccuracy: true, maximumAge: 0, timeout: 3000 }
      );
    } else {
      alert(
        "이 브라우저에서는 사용자 현재 위치 기반 주변 맛집 기능이 지원되지 않습니다."
      );
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "0px",
          right: "0px",
          overflow: "auto"
        }}
      >
        <NavbarComp userId={userId} history={props.history} />
        <hr />
        {latitude > 0 && longitude > 0 ? (
          <KakaoMapCoords
            latitude={latitude}
            longitude={longitude}
            mapLevel={4}
          />
        ) : null}
        <Footer />
      </div>
    </div>
  );
}

export default withRouter(CurrentLocation);
