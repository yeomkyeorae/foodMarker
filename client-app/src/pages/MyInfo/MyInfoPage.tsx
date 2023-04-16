import React, {useState, useEffect} from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {updateUserMyPlace} from '../../_actions/user_action';
import {
  readRestaurants,
  readRestaurantsCount,
} from '../../_actions/restaurant_action';
import {readWishList, readWishListCount} from '../../_actions/wishList_action';
import NavbarComp from '../Navbar/NavbarComp';
import Footer from '../../components/containers/Footer/Footer';
import MyCalendar from './MyCalendar';
import {Button} from 'react-bootstrap';
import {RestaurantDetail} from '../../components/interfaces/Restaurant';
import {WishListType} from '../../components/interfaces/WishList';
import {LocationCode, NavMenuType} from '../../library/def';
import AlertModal from '../../components/containers/AlertModal/AlertModal';
import * as S from './MyInfoPage.style';

const colorBar = [
  {color: 'gold', text: '평점 5점'},
  {color: '#8bc34a', text: '평점 4점대'},
  {color: '#35baf6', text: '평점 3점대'},
  {color: '#ed4b82', text: '평점 2점대'},
  {color: 'gray', text: '평점 1점대'},
];

interface Props {
  history: RouteComponentProps['history'];
}

function MyInfoPage({history}: Props): React.ReactElement {
  const [myRestaurantsCount, setMyRestaurantsCount] = useState(0);
  const [myWishListCount, setMyWishListCount] = useState(0);
  const [myRestaurants, setMyRestaurants] = useState<RestaurantDetail[]>([]);
  const [myWishlists, setWishlists] = useState<WishListType[]>([]);
  const [myPlace, setMyPlace] = useState<string>(
    window.sessionStorage.getItem('myPlace') ?? String(LocationCode.All),
  );
  const [alertToggle, setAlertToggle] = useState(false);

  const userId = window.sessionStorage.getItem('userId') as string;

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(readRestaurantsCount(userId)).then(response => {
      setMyRestaurantsCount(response.payload);
    });

    dispatch(readWishListCount(userId)).then(response => {
      setMyWishListCount(response.payload);
    });

    dispatch(readRestaurants(userId, 1, 1000)).then(response => {
      setMyRestaurants(response.payload);
    });

    const DEFAULT_ORDER = 1;
    dispatch(readWishList(userId, DEFAULT_ORDER)).then(response => {
      setWishlists(response.payload);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const myRestaurantsCntObj = {};
  myRestaurants.forEach(restaurant => {
    const area = restaurant.address.split(' ')[0];
    myRestaurantsCntObj[area] = myRestaurantsCntObj[area] + 1 || 1;
  });

  const myWishlistsCntObj = {};
  myWishlists.forEach(wishlist => {
    const area = wishlist.address.split(' ')[0];
    myWishlistsCntObj[area] = myWishlistsCntObj[area] + 1 || 1;
  });

  const handleMyPlace = e => {
    setMyPlace(e.target.value);
  };

  const changeMyPlace = () => {
    const body = {myPlace};
    dispatch(updateUserMyPlace(body)).then(response => {
      if (response.payload.success) {
        setAlertToggle(true);
        window.sessionStorage.setItem('myPlace', myPlace);
      }
    });
  };

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '0px',
          right: '0px',
          overflow: 'hidden',
        }}>
        <NavbarComp history={history} menu={NavMenuType.Myinfo} />
        <hr />
        <div>
          <div style={{height: '120px'}}>
            <h1>내 정보 페이지</h1>
          </div>
          <hr />
          <div style={{marginBottom: '30px'}}>
            <h3>맛집 통계</h3>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <S.InfoBlock backgroundColor={'#5B6DCD'}>
                <S.InfoTitle>등록한 나의 방문 맛집 개수</S.InfoTitle>
                <div style={{height: '100px'}}>
                  <S.InfoContent>{myRestaurantsCount}개</S.InfoContent>
                </div>
              </S.InfoBlock>
              <S.InfoBlock backgroundColor={'#FFD703'}>
                <S.InfoTitle>등록한 나의 위시 맛집 개수</S.InfoTitle>
                <div style={{height: '100px'}}>
                  <S.InfoContent>{myWishListCount}개</S.InfoContent>
                </div>
              </S.InfoBlock>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <S.InfoBlock backgroundColor={'#60F5D0'}>
                <S.InfoTitle>지역별 나의 방문 맛집</S.InfoTitle>
                <div
                  style={{
                    height: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  {Object.keys(myRestaurantsCntObj).map(area => (
                    <S.InfoContent key={area}>
                      {area} {myRestaurantsCntObj[area]}개
                    </S.InfoContent>
                  ))}
                </div>
              </S.InfoBlock>
              <S.InfoBlock backgroundColor={'#FF91A4'}>
                <S.InfoTitle>지역별 나의 위시 맛집</S.InfoTitle>
                <div
                  style={{
                    height: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  {Object.keys(myWishlistsCntObj).map(area => (
                    <S.InfoContent key={area}>
                      {area} {myWishlistsCntObj[area]}개
                    </S.InfoContent>
                  ))}
                </div>
              </S.InfoBlock>
            </div>
          </div>
          <hr />
          <div style={{width: '50%', margin: 'auto'}}>
            <h3>나의 방문 맛집 달력</h3>
            <div style={{display: 'flex'}}>
              {colorBar.map((el, index) => (
                <S.ColorBar key={`colorBar` + index} backgroundColor={el.color}>
                  {el.text}
                </S.ColorBar>
              ))}
            </div>
            <MyCalendar restaurants={myRestaurants} />
          </div>
        </div>
        <hr />
        <div style={{marginBottom: '30px'}}>
          <h3>나의 맛집 지도 지역 설정</h3>
          <div
            style={{
              height: '50px',
              padding: '5px',
              display: 'flex',
              justifyContent: 'center',
            }}>
            <select
              id="select"
              value={myPlace}
              style={{
                height: '100%',
                fontSize: '24px',
                minWidth: '20px',
                display: 'block',
              }}
              onChange={e => handleMyPlace(e)}>
              <option value={LocationCode.All}>전국</option>
              <option value={LocationCode.Gangwon}>강원</option>
              <option value={LocationCode.Gyeonggi}>경기</option>
              <option value={LocationCode.Seoul}>서울</option>
              <option value={LocationCode.Incheon}>인천</option>
              <option value={LocationCode.Chungnam}>충남</option>
              <option value={LocationCode.Chungbuk}>충북</option>
              <option value={LocationCode.Daejeon}>대전</option>
              <option value={LocationCode.Sejong}>세종</option>
              <option value={LocationCode.Gyeongbuk}>경북</option>
              <option value={LocationCode.Gyeongnam}>경남</option>
              <option value={LocationCode.Daegu}>대구</option>
              <option value={LocationCode.Ulsan}>울산</option>
              <option value={LocationCode.Busan}>부산</option>
              <option value={LocationCode.Jeonbuk}>전북</option>
              <option value={LocationCode.Jeonnam}>전남</option>
              <option value={LocationCode.Gwangju}>광주</option>
              <option value={LocationCode.Jeju}>제주</option>
            </select>
            <Button
              variant="primary"
              style={{marginLeft: '5px', display: 'inline-block'}}
              onClick={() => changeMyPlace()}>
              설정하기
            </Button>
          </div>
        </div>
        <hr />
        <Footer />
      </div>
      {alertToggle ? (
        <AlertModal
          setAlertToggle={setAlertToggle}
          alertMessage={'나의 맛집 지역 설정이 완료되었습니다'}
        />
      ) : null}
    </>
  );
}

export default withRouter(MyInfoPage);
