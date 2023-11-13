import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import KakaoMapCoords from '../../components/kakaoMap/KakaoMapCoords';
import SubPage from './SubPage';
import LoadingPage from './LoadingPage';
import AlertModal from '../../components/alert/AlertModal';
import { NavMenuType } from '../../library/def';

interface Props {
  history: RouteComponentProps['history'];
}

function CurrentLocation({ history }: Props): React.ReactElement {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongtitude] = useState(0);
  const [isSuccess, setIsSuccess] = useState(true);
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      //위치 정보
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude);
          setLongtitude(pos.coords.longitude);
        },
        () => {
          setIsSuccess(false);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 },
      );
    } else {
      setAlertToggle(true);
      setAlertMessage('이 브라우저에서는 사용자 현재 위치 기반 주변 맛집 기능이 지원되지 않습니다.');
    }

    return () => {
      return;
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: '0px',
        bottom: '50px',
        right: '0px',
        overflow: 'auto',
      }}
    >
      <Navbar history={history} menu={NavMenuType.CurrentLocation} />
      <hr />
      {latitude > 0 && longitude > 0 ? (
        <KakaoMapCoords latitude={latitude} longitude={longitude} mapLevel={4} />
      ) : (
        <LoadingPage />
      )}
      {!isSuccess ? <SubPage /> : null}
      {alertToggle ? <AlertModal setAlertToggle={setAlertToggle} alertMessage={alertMessage} /> : null}
      <Footer position='fixed' />
    </div>
  );
}

export default withRouter(CurrentLocation);
