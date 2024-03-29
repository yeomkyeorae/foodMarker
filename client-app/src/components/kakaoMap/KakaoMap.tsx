import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Restaurant } from '../../interfaces/Restaurant';

const { kakao } = window;

interface Props extends RouteComponentProps {
  address?: string;
  restaurantName?: string;
  latitude?: number;
  longitude?: number;
  mapLevel?: number;
  restaurants?: Restaurant[];
  width: string;
  height?: string;
  inlineBlock?: boolean;
}

function KakaoMap({
  address,
  restaurantName,
  latitude,
  longitude,
  mapLevel,
  restaurants,
  width,
  height,
  inlineBlock,
}: Props): React.ReactElement {
  useEffect(() => {
    kakao.maps.load(async () => {
      const container = document.getElementById('map');
      const map = new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(address ? 37.52393 : latitude, address ? 126.980493 : longitude), // 초기값: 국립중앙박물관
        level: mapLevel, //지도의 레벨(확대, 축소 정도)
      });

      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      const geocoder = new kakao.maps.services.Geocoder();

      if (address) {
        // 주소로 좌표를 검색합니다
        // 서울 중구 창경궁로 62-29
        if (address) {
          geocoder.addressSearch(address, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

              // 결과값으로 받은 위치를 마커로 표시합니다
              const marker = new kakao.maps.Marker({
                map: map,
                position: coords,
              });

              // 인포윈도우로 장소에 대한 설명을 표시합니다
              const infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;">' + restaurantName + '</div>',
              });

              infowindow.open(map, marker);

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          });
        }
      }

      if (restaurants) {
        restaurants.forEach((restaurant) => {
          geocoder.addressSearch(restaurant.address, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

              // 결과값으로 받은 위치를 마커로 표시합니다
              const marker = new kakao.maps.Marker({
                map: map,
                position: coords,
              });

              marker.setMap(map);

              const iwContent = `<div style="padding:5px;">${restaurant.name}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

              // 인포윈도우를 생성합니다
              const infowindow = new kakao.maps.InfoWindow({
                content: iwContent,
              });

              // 마커에 마우스오버 이벤트를 등록합니다
              kakao.maps.event.addListener(marker, 'mouseover', function () {
                // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
                infowindow.open(map, marker);
              });

              // 마커에 마우스아웃 이벤트를 등록합니다
              kakao.maps.event.addListener(marker, 'mouseout', function () {
                // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
                infowindow.close();
              });
            }
          });
        });
      }
    });
  });

  return (
    <div
      id={`map`}
      style={{
        width: `${width}`,
        height: `${height ? height : '540px'}`,
        display: `${inlineBlock ? 'inline-block' : 'null'}`,
      }}
    ></div>
  );
}

export default withRouter(KakaoMap);
