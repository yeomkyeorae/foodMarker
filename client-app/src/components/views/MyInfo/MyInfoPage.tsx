import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { readRestaurants ,readRestaurantsCount } from '../../../_actions/restaurant_action';
import { readWishList, readWishListCount } from '../../../_actions/wishList_action';
import NavbarComp from "../Navbar/NavbarComp";
import Footer from "../Footer/Footer";
import MyCalendar from "./MyCalendar";
import styled from "styled-components";
import { RestaurantType } from "../../interfaces/Restaurant";
import { WishListType } from "../../interfaces/WishList"; 


const InfoBlock = styled.div<{backgroundColor?: string;}>`
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

const ColorBar = styled.div<{backgroundColor?: string;}>`
  margin-right: 2px;
  background-color: ${props => props.backgroundColor};
  color: white;
  width: 20%;
`;

const colorBar = [
  {color: "gold", text: "평점 5점"}, 
  {color: "#8bc34a", text: "평점 4점대"}, 
  {color: "#35baf6", text: "평점 3점대"},
  {color: "#ed4b82", text: "평점 2점대"},
  {color: "gray", text: "평점 1점대"}
];

function MyInfoPage(props) {
  const [myRestaurantsCount, setMyRestaurantsCount] = useState(0);
  const [myWishListCount, setMyWishListCount] = useState(0);
  const [myRestaurants, setMyRestaurants] = useState<RestaurantType[]>([]);
  const [myWishlists, setWishlists] = useState<WishListType[]>([]);

  const { userId } = props.location.state;

  const dispatch = useDispatch<any>();

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
        <NavbarComp history={props.history} />
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
                <div style={{ display: "flex"}}>
                  {
                    colorBar.map((el, index) => <ColorBar key={`colorBar` + index} backgroundColor={el.color}>{el.text}</ColorBar>)
                  }
                </div>
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
