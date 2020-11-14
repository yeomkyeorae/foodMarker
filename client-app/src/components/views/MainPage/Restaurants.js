import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import RestaurantList from "./RestaurantList";

const { kakao } = window;

function Restaurants(props) {
  const userId = props.userId;
  const [address, setAddress] = useState("서울 중구 창경궁로 62-29");
  const [restaurantName, setRestaurantName] = useState("우래옥");

  useEffect(() => {
    kakao.maps.load(() => {
      let container = document.getElementById("map");
      let map = new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      });

      let geocoder = new kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      // 서울 중구 창경궁로 62-29
      geocoder.addressSearch(address, function(result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          let marker = new kakao.maps.Marker({
            map: map,
            position: coords
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          let infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:6px 0;">' +
              restaurantName +
              "</div>"
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      });
    });
  });

  return (
    <div style={{ display: "inline-block", width: "80%" }}>
      <div
        id={`map`}
        style={{
          width: "50%",
          height: "500px",
          display: "inline-block"
        }}
      ></div>
      <RestaurantList
        userId={userId}
        setAddress={setAddress}
        setRestaurantName={setRestaurantName}
      />
    </div>
  );
}

export default withRouter(Restaurants);
