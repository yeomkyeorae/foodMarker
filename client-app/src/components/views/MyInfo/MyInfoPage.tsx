import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useDispatch } from "react-redux";
import { readRestaurants, readRestaurantsCount } from '../../../_actions/restaurant_action';
import { readWishList, readWishListCount } from '../../../_actions/wishList_action';
import NavbarComp from "../Navbar/NavbarComp";
import Footer from "../Footer/Footer";
import MyCalendar from "./MyCalendar";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { RestaurantDetail } from "../../interfaces/Restaurant";
import { WishListType } from "../../interfaces/WishList";
import { NavMenuType } from "../../../library/def";


const InfoBlock = styled.div<{ backgroundColor?: string; }>`
  width: 25%;
  border-radius: 30px;
  background-color: ${props => props.backgroundColor};
  color: white;
  margin: 10px;
`;

const InfoTitle = styled.h3`
  margin-top: 10px;
`;

const InfoContent = styled.span`
  font-size: 1.5rem;
`;

const ColorBar = styled.div<{ backgroundColor?: string; }>`
  margin-right: 2px;
  background-color: ${props => props.backgroundColor};
  color: white;
  width: 20%;
`;

const colorBar = [
  { color: "gold", text: "평점 5점" },
  { color: "#8bc34a", text: "평점 4점대" },
  { color: "#35baf6", text: "평점 3점대" },
  { color: "#ed4b82", text: "평점 2점대" },
  { color: "gray", text: "평점 1점대" }
];

interface Props {
  history: RouteComponentProps["history"]
}


function MyInfoPage({ history }: Props): React.ReactElement {
  const [myRestaurantsCount, setMyRestaurantsCount] = useState(0);
  const [myWishListCount, setMyWishListCount] = useState(0);
  const [myRestaurants, setMyRestaurants] = useState<RestaurantDetail[]>([]);
  const [myWishlists, setWishlists] = useState<WishListType[]>([]);
  const [myLocation, setMyLocation] = useState<string>("1");

  const userId = window.sessionStorage.getItem("userId") as string;

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

  const handleMyLocation = e => {
    setMyLocation(e.target.value);
  };

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "0px",
          right: "0px",
          overflow: "hidden"
        }}
      >
        <NavbarComp history={history} menu={NavMenuType.Myinfo} />
        <hr />
        <div>
          <div style={{ height: "120px" }}>
            <h1>내 정보 페이지</h1>
          </div>
          <hr />
          <div style={{ marginBottom: "30px" }}>
            <h3>맛집 통계</h3>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <InfoBlock backgroundColor={"#5B6DCD"}>
                <InfoTitle>등록한 나의 방문 맛집 개수</InfoTitle>
                <div style={{ height: "100px" }}>
                  <InfoContent>{myRestaurantsCount}개</InfoContent>
                </div>
              </InfoBlock>
              <InfoBlock backgroundColor={"#FFD703"}>
                <InfoTitle>등록한 나의 위시 맛집 개수</InfoTitle>
                <div style={{ height: "100px" }}>
                  <InfoContent>{myWishListCount}개</InfoContent>
                </div>
              </InfoBlock>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <InfoBlock backgroundColor={"#60F5D0"}>
                <InfoTitle>지역별 나의 방문 맛집</InfoTitle>
                <div style={{ height: "100px", display: "flex", flexDirection: "column" }}>
                  {
                    Object.keys(myRestaurantsCntObj).map(area =>
                      <InfoContent key={area}>{area} {myRestaurantsCntObj[area]}개</InfoContent>
                    )
                  }
                </div>
              </InfoBlock>
              <InfoBlock backgroundColor={"#FF91A4"}>
                <InfoTitle>지역별 나의 위시 맛집</InfoTitle>
                <div style={{ height: "100px", display: "flex", flexDirection: "column" }}>
                  {
                    Object.keys(myWishlistsCntObj).map(area =>
                      <InfoContent key={area}>{area} {myWishlistsCntObj[area]}개</InfoContent>
                    )
                  }
                </div>
              </InfoBlock>
            </div>
          </div>
          <hr />
          <div style={{ width: "50%", margin: "auto" }}>
            <h3>나의 방문 맛집 달력</h3>
            <div style={{ display: "flex" }}>
              {
                colorBar.map((el, index) => <ColorBar key={`colorBar` + index} backgroundColor={el.color}>{el.text}</ColorBar>)
              }
            </div>
            <MyCalendar restaurants={myRestaurants} />
          </div>
        </div>
        <hr />
        <div style={{ marginBottom: "30px" }}>
          <h3>나의 맛집 지도 지역 설정</h3>
          <div style={{ height: "50px", padding: "5px", display: 'flex', justifyContent: 'center' }}>
            <select
              id="select"
              value={myLocation}
              style={{ height: "100%", fontSize: "24px", minWidth: "20px", display: "block" }}
              onChange={e => handleMyLocation(e)}
            >
              <option value="1">강원</option>
              <option value="1">경기</option>
              <option value="1">서울</option>
              <option value="1">인천</option>
              <option value="1">충남</option>
              <option value="1">충북</option>
              <option value="1">대전</option>
              <option value="1">세종</option>
              <option value="1">경북</option>
              <option value="2">경남</option>
              <option value="1">대구</option>
              <option value="2">울산</option>
              <option value="2">부산</option>
              <option value="2">전북</option>
              <option value="2">전남</option>
              <option value="2">광주</option>
              <option value="2">제주</option>
            </select>
            <Button
              variant="primary"
              style={{ marginLeft: "5px", display: "inline-block" }}
            >
              설정하기
            </Button>
          </div>
        </div>
        <hr />
        <Footer />
      </div>
    </div>
  );
}

export default withRouter(MyInfoPage);
