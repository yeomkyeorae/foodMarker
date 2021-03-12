import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { readRestaurants } from "../../../_actions/restaurant_action";

const { kakao } = window;

function KakaoMap(props) {
  const dispatch = useDispatch();
  const {
    userId,
    address,
    restaurantName,
    latitude,
    longitude,
    mapLevel
  } = props;

  const body = {
    id: userId
  };

  useEffect(() => {
    kakao.maps.load(async () => {
      const response = await dispatch(readRestaurants(body));

      let container = document.getElementById("map");
      let map = new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(
          address ? 37.52393 : latitude,
          address ? 126.980493 : longitude
        ), // 초기값: 국립중앙박물관
        level: mapLevel //지도의 레벨(확대, 축소 정도)
      });

      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      let geocoder = new kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      // 서울 중구 창경궁로 62-29
      if (address) {
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
      }
    });
  });

  return (
    <div
      id={`map`}
      style={{
        width: "45%",
        height: "540px",
        display: "inline-block"
      }}
    ></div>
  );
}

export default withRouter(KakaoMap);
