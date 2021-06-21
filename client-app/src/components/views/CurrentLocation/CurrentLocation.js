import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import NavbarComp from "../Navbar/NavbarComp";
import Footer from "../Footer/Footer";

const { kakao } = window;

function CurrentLocation(props) {
  const userId = props.location.state;

  useEffect(() => {
    if (navigator.geolocation) {
      //위치 정보
      navigator.geolocation.getCurrentPosition(pos => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        const mapLevel = 5;

        kakao.maps.load(async () => {
          let container = document.getElementById("map");
          let map = new kakao.maps.Map(container, {
            center: new kakao.maps.LatLng(latitude, longitude), // 초기값: 국립중앙박물관
            level: mapLevel //지도의 레벨(확대, 축소 정도)
          });

          const zoomControl = new kakao.maps.ZoomControl();
          map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

          let geocoder = new kakao.maps.services.Geocoder();
          searchDetailAddrFromCoords(longitude, latitude, result => {
            console.log("test:", result);
          });

          function searchAddrFromCoords(longitude, latitude, callback) {
            // 좌표로 행정동 주소 정보를 요청합니다
            geocoder.coord2RegionCode(longitude, latitude, callback);
          }

          function searchDetailAddrFromCoords(longitude, latitude, callback) {
            // 좌표로 법정동 상세 주소 정보를 요청합니다
            geocoder.coord2Address(longitude, latitude, callback);
          }
        });
      });
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
          bottom: "50px",
          left: "0px",
          right: "0px",
          overflow: "auto"
        }}
      >
        <NavbarComp userId={userId} history={props.history} />
        <hr />
        <div
          id={`map`}
          style={{
            width: `${"1000px"}`,
            height: "540px",
            display: `${true ? "inline-block" : "null"}`
          }}
        ></div>
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(CurrentLocation);
