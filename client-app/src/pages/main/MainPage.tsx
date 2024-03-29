import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { readRestaurantsNoImage, readTenRestaurants } from '../../_actions/restaurant_action';
import { readTenWishList } from '../../_actions/wishList_action';
import Navbar from '../../components/navbar/Navbar';
import KakaoMap from '../../components/kakaoMap/KakaoMap';
import Footer from '../../components/footer/Footer';
import '@brainhubeu/react-carousel/lib/style.css';
import { Restaurant, RestaurantDetail } from '../../interfaces/Restaurant';
import { WishListType } from '../../interfaces/WishList';
import { NavMenuType, LocationCodeInfo, LocationCode } from '../../library/def';
import { BiUser, BiMapPin, BiMale } from 'react-icons/bi';
import * as S from './MainPage.style';
import { useAuthContext } from '../../context/auth';

interface Props {
  history: RouteComponentProps['history'];
}

function MainPage({ history }: Props): React.ReactElement {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [tenRestaurants, setTenRestaurants] = useState<RestaurantDetail[]>([]);
  const [tenWishList, setTenWishList] = useState<WishListType[]>([]);

  const dispatch = useDispatch<any>();

  const user = useAuthContext();
  const userId = user.userId as string;
  const myPlace = (user.myPlace as string) ?? '0';

  useEffect(() => {
    const { locationName, latitude, longitude, mapLevel } = LocationCodeInfo[myPlace];

    setLatitude(latitude);
    setLongitude(longitude);
    setMapLevel(mapLevel);

    const optionLocation = myPlace === String(LocationCode.All) ? '' : locationName;

    dispatch(readRestaurantsNoImage(userId, optionLocation)).then((response) => {
      setRestaurants(response.payload);
    });
    dispatch(readTenRestaurants()).then((response) => {
      setTenRestaurants(response.payload.data.restaurants);
    });
    dispatch(readTenWishList()).then((response) => {
      setTenWishList(response.payload.wishLists);
    });
  }, []);

  const [latitude, setLatitude] = useState(37.52393);
  const [longitude, setLongitude] = useState(126.980493);
  const [mapLevel, setMapLevel] = useState(8);

  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: '0px',
        right: '0px',
        overflow: 'auto',
      }}
    >
      <Navbar history={history} menu={NavMenuType.Main} />
      <div style={{ backgroundColor: '#FAF7F2' }}>
        <S.FoodMarkerTitle>
          <div>
            <span
              style={{
                fontWeight: '300',
                fontSize: '2rem',
                textAlign: 'center',
              }}
            >
              푸드마커로 맛집의 지도를 완성해 보세요
            </span>
          </div>
        </S.FoodMarkerTitle>
        <S.FoodMarkerExplanation>
          <div style={{ margin: 'auto', textAlign: 'left' }}>
            <Link to={{ pathname: '/marker', state: { userId, menu: 2 } }} style={{ textDecoration: 'none' }}>
              <S.FoodMarkerExplanationTitle>
                <BiUser />
                나의 맛집
              </S.FoodMarkerExplanationTitle>
            </Link>
            <br />
            <span>당신이 최근에 방문한 최고의 맛집은 어디인가요?</span>
            <br />
            <span>인상 깊은 식당을 등록해 보세요.</span>
          </div>
          <div style={{ margin: 'auto', textAlign: 'left' }}>
            <Link to={{ pathname: '/wish', state: { userId, menu: 3 } }} style={{ textDecoration: 'none' }}>
              <S.FoodMarkerExplanationTitle>
                <BiMapPin />
                위시 맛집
              </S.FoodMarkerExplanationTitle>
            </Link>
            <br />
            <span>시선을 사로잡은 맛집은 어디인가요?</span>
            <br />
            <span>방문하고자 하는 식당을 기록해 보세요.</span>
          </div>
          <div style={{ margin: 'auto', textAlign: 'left' }}>
            <Link to={{ pathname: '/choizaroad', state: { userId, menu: 4 } }} style={{ textDecoration: 'none' }}>
              <S.FoodMarkerExplanationTitle>
                <BiMale />
                최자로드
              </S.FoodMarkerExplanationTitle>
            </Link>
            <br />
            <span>최자로드에 등장한 맛집이 궁금하신가요?</span>
            <br />
            <span>자형과 함께 해보세요.</span>
            <br />
            <span></span>
          </div>
        </S.FoodMarkerExplanation>
      </div>
      <div style={{ padding: '5px' }}>
        <S.H2>나의 맛집 지도</S.H2>
        <S.H3>현재 설정 지역: {LocationCodeInfo[myPlace].locationName}</S.H3>
      </div>
      <div>
        <KakaoMap
          latitude={latitude}
          longitude={longitude}
          mapLevel={mapLevel}
          restaurants={restaurants}
          width={'100%'}
          height={'480px'}
          inlineBlock={false}
        />
      </div>
      <div
        style={{
          marginBottom: '10px',
          backgroundColor: '#edfcee',
          margin: '0',
        }}
      >
        <div style={{ paddingTop: '20px', marginBottom: '20px' }}>
          <S.H2>최근에 등록된 나의 맛집들</S.H2>
        </div>
        <S.OrderList>
          {tenRestaurants.map((restaurntItem, ix) => (
            <S.List key={ix}>
              <div>
                <img src={restaurntItem.imgURL.split(',')[0]} alt='' width='180px' height='200px' />
              </div>
              <div>
                <div>
                  <p
                    style={{
                      fontWeight: '500',
                      fontSize: '1.5rem',
                      marginBottom: '5px',
                    }}
                  >
                    <a
                      href={`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${restaurntItem.name}`}
                      target='_blank'
                      style={{
                        textDecoration: 'none',
                        color: '#ff6700',
                        cursor: 'pointer',
                      }}
                    >
                      {restaurntItem.name}
                    </a>
                  </p>
                  <p style={{ fontWeight: '300', margin: '0' }}>{restaurntItem.address}</p>
                  <p style={{ fontWeight: '400', margin: '0' }}>{restaurntItem.username}</p>
                </div>
              </div>
            </S.List>
          ))}
        </S.OrderList>
      </div>
      <div
        style={{
          marginBottom: '10px',
          backgroundColor: '#FAFDF3',
        }}
      >
        <div style={{ paddingTop: '20px', marginBottom: '20px' }}>
          <S.H2>최근에 등록된 위시 맛집들</S.H2>
        </div>
        <S.OrderList>
          {tenWishList.map((wishListItem, ix) => (
            <S.List key={ix}>
              <div style={{ marginBottom: '5px' }}>
                <p
                  style={{
                    fontWeight: '500',
                    fontSize: '1.5rem',
                    margin: '0',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <a
                    href={`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${wishListItem.name}`}
                    target='_blank'
                    style={{
                      textDecoration: 'none',
                      color: '#ff6700',
                      cursor: 'pointer',
                    }}
                  >
                    {wishListItem.name}
                  </a>
                </p>
                <p style={{ fontWeight: '300', margin: '0' }}>{wishListItem.address}</p>
                <p style={{ fontWeight: '400', margin: '0' }}>{wishListItem.username}</p>
              </div>
            </S.List>
          ))}
        </S.OrderList>
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(MainPage);
