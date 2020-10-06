import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import RestaurantList from "./RestaurantList";

const { kakao } = window;

function MainPage(props) {
  const mapContainer = useRef();
  const dispatch = useDispatch();
  const userId = props.location.state.userId;

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
    dispatch(logoutUser()).then(response => {
      if (response.payload.success) {
        props.history.push("/loginSignup");
      } else {
        console.log(response);
        alert("failed to logout");
      }
    });
  };

  return (
    <div>
      <button onClick={onClickHandler}>로그아웃</button>
      <RestaurantList userId={userId} />
      <div id={`map`} style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
}

export default withRouter(MainPage);
