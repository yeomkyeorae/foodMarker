import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { registerWishList } from "../../../_actions/wishList_action";
import AlertModal from "../AlertModal/AlertModal";
import { useDispatch } from "react-redux";

const { kakao } = window;

function KakaoMapCoords(props) {
  const { latitude, longitude, mapLevel } = props;
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [dong, setDong] = useState();

  const dispatch = useDispatch();

  const userId = window.sessionStorage.getItem("userId");
  const username = window.sessionStorage.getItem("username");

  useEffect(() => {
    kakao.maps.load(async () => {
      let container = document.getElementById("map");
      let map = new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: mapLevel
      });

      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      let infowindow = new kakao.maps.InfoWindow({
        zIndex: 1,
        removable: true
      });
      let geocoder = new kakao.maps.services.Geocoder();

      searchDetailAddrFromCoords(longitude, latitude, displayCenterInfo);

      // function searchAddrFromCoords(longitude, latitude, callback) {
      //   // 좌표로 행정동 주소 정보를 요청합니다
      //   geocoder.coord2RegionCode(longitude, latitude, callback);
      // }

      function searchDetailAddrFromCoords(longitude, latitude, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(longitude, latitude, callback);
      }

      function displayCenterInfo(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          setDong(result[0]["address"]["address_name"]);
        }
      }

      if (dong) {
        const ps = new kakao.maps.services.Places();

        const displayMarker = (place) => {
          // 마커를 생성하고 지도에 표시합니다
          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x)
          });

          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "click", function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent(
              '<div style="padding:5px;font-size:12px;text-align:left">' +
                place.place_name +
                "<br />" +
                '<div class="marker">' +
                "위시 맛집 등록하기" +
                "</div>" +
                "</div>"
            );
            infowindow.open(map, marker);
            const markerElement = document.getElementsByClassName("marker");

            markerElement[0].addEventListener("click", () => {
              const body = {
                user: userId,
                username: username,
                name: place.place_name,
                address: place.address_name,
                created: new Date().toLocaleString()
              };
              dispatch(registerWishList(body)).then(response => {
                setAlertToggle(true);
                setAlertMessage("위시 맛집에 등록되었습니다");
              }).catch(err => {
                setAlertToggle(true);
                setAlertMessage("위시 맛집에 등록이 실패했습니다");
              });
            });
          });
        }

        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        const placesSearchCB = (data, status, pagination) => {
          if (status === kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            // var bounds = new kakao.maps.LatLngBounds();

            for (let i = 0; i < data.length; i++) {
              displayMarker(data[i]);
              // bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            // map.setBounds(bounds);
          }
        }

        // 키워드로 장소를 검색합니다
        ps.keywordSearch(`${dong} 맛집`, placesSearchCB);
      }
    });
  }, [latitude, longitude, mapLevel, dong, dispatch, userId, username]);

  return (
    <div
      id={`map`}
      style={{
        width: "100%",
        height: "80%"
      }}
    >
    {
      alertToggle ?
      <AlertModal setAlertToggle={setAlertToggle} alertMessage={alertMessage} /> :
      null
    }
    </div>
  );
}

export default withRouter(KakaoMapCoords);
