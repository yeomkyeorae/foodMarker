import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { readRestaurants ,readRestaurantsCount } from '../../../_actions/restaurant_action';
import { readWishList, readWishListCount } from '../../../_actions/wishList_action';
import NavbarComp from "../Navbar/NavbarComp";
import Footer from "../Footer/Footer";
import MyCalendar from "./MyCalendar";
import styled from "styled-components";
import { GiConsoleController } from "react-icons/gi";

const InfoBlock = styled.div`
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

function MyInfoPage(props) {
  const [myRestaurantsCount, setMyRestaurantsCount] = useState(0);
  const [myWishListCount, setMyWishListCount] = useState(0);
  const [myRestaurants, setMyRestaurants] = useState([]);
  const [myWishlists, setWishlists] = useState([]);

  const userId = props.location.state;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readRestaurantsCount(userId)).then(response => {
      setMyRestaurantsCount(response.payload);
    });

    dispatch(readWishListCount(userId)).then(response => {
      setMyWishListCount(response.payload);
    });

    const body = {
      id: userId,
      page: 1,
      itemPerPage: 1000,
      order: 1
    };

    dispatch(readRestaurants(body)).then(response => {
      setMyRestaurants(response.payload);
    });

    dispatch(readWishList(userId)).then(response => {
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
        <NavbarComp userId={userId} history={props.history} />
        <hr />
        <div>
            <div style={{ height: "150px"}}>
                <h1>내 정보 페이지</h1>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <InfoBlock backgroundColor={"#5B6DCD"}>
                    <InfoTitle>등록한 나의 방문 맛집 개수</InfoTitle>
                    <div style={{height: "100px"}}>
                        <InfoContent>{myRestaurantsCount}개</InfoContent>
                    </div>
                </InfoBlock>
                <InfoBlock backgroundColor={"#FFD703"}>
                    <InfoTitle>등록한 나의 위시 맛집 개수</InfoTitle>
                    <div style={{height: "100px"}}>
                      <InfoContent>{myWishListCount}개</InfoContent>
                    </div>
                </InfoBlock>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <InfoBlock backgroundColor={"#60F5D0"}>
                    <InfoTitle>지역별 나의 방문 맛집</InfoTitle>
                    <div style={{height: "100px", display: "flex", flexDirection: "column"}}>
                    {
                      Object.keys(myRestaurantsCntObj).map(area => 
                        <InfoContent key={area}>{area} {myRestaurantsCntObj[area]}개</InfoContent>
                      )
                    }
                    </div>
                </InfoBlock>
                <InfoBlock backgroundColor={"#FF91A4"}>
                    <InfoTitle>지역별 나의 위시 맛집</InfoTitle>
                    <div style={{height: "100px", display: "flex", flexDirection: "column"}}>
                    {
                      Object.keys(myWishlistsCntObj).map(area => 
                        <InfoContent key={area}>{area} {myWishlistsCntObj[area]}개</InfoContent>
                      )
                    }
                    </div>
                </InfoBlock>
            </div>
            <div style={{ width: "50%", margin: "auto"}}>
                <h3>나의 방문 맛집 달력</h3>
                <MyCalendar restaurants={myRestaurants} />
            </div>
        </div>
        <hr />
        <Footer />
      </div>
    </div>
  );
}

export default withRouter(MyInfoPage);
