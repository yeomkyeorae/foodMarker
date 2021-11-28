import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import NavbarComp from "../Navbar/NavbarComp";
import Footer from "../Footer/Footer";
import KakaoMapCoords from "../../containers/KakaoMap/KakaoMapCoords";
import SubPage from "./SubPage";
import AlertModal from "../../containers/AlertModal/AlertModal";


function CurrentLocation(props) {
  const userId = props.location.state;

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongtitude] = useState(0);
  const [isSuccess, setIsSuccess] = useState(true);
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      //위치 정보
      navigator.geolocation.getCurrentPosition(
        pos => {
          setLatitude(pos.coords.latitude);
          setLongtitude(pos.coords.longitude);
        },
        () => {
          setIsSuccess(false); 
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    } else {
      setAlertToggle(true);
      setAlertMessage("이 브라우저에서는 사용자 현재 위치 기반 주변 맛집 기능이 지원되지 않습니다.");
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "0px",
          bottom: "50px",
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
        { !isSuccess ? <SubPage /> : null }
        {
          alertToggle ?
          <AlertModal setAlertToggle={setAlertToggle} alertMessage={alertMessage} /> :
          null
        }
        <Footer position="fixed"/>
      </div>
    </div>
  );
}

export default withRouter(CurrentLocation);
