import React, { useEffect, useRef } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
const { kakao } = window;

function MainPage(props) {
  const mapContainer = useRef();
  useEffect(() => {
    kakao.maps.load(() => {
      let container = document.getElementById("map");
      let map = new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      });
    });
  }, []);

  const onClickHandler = () => {
    axios.get("/api/users/logout").then(response => {
      if (response.data.success) {
        props.history.push("/loginSignup");
      } else {
        alert("failed to logout");
      }
    });
  };

  return (
    <div>
      <button onClick={onClickHandler}>로그아웃</button>
      <div id={`map`} style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
}

export default withRouter(MainPage);
