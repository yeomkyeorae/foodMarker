import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { readRestaurants ,readRestaurantsCount } from '../../../_actions/restaurant_action';
import { readWishList, readWishListCount } from '../../../_actions/wishList_action';
import NavbarComp from "../Navbar/NavbarComp";
import Footer from "../Footer/Footer";
import styled from "styled-components";
import { GiConsoleController } from "react-icons/gi";

// const Div = styled.div`
//   display: inline-block;
//   width: 100%;
//   &:hover {
//     text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
//     color: #ff6700;
//   }
//   cursor: pointer;
// `;

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
                <div style={{ width: "40%"}}>
                    <h3>등록한 나의 방문 맛집 개수</h3>
                    <div style={{height: "100px"}}>
                        <span style={{ fontSize: "2rem" }}>{myRestaurantsCount}개</span>
                    </div>
                </div>
                <div style={{ width: "40%"}}>
                    <h3>등록한 나의 위시 맛집 개수</h3>
                    <div style={{height: "100px"}}>
                      <span style={{ fontSize: "2rem" }}>{myWishListCount}개</span>
                    </div>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <div style={{ width: "40%"}}>
                    <h3>지역별 나의 방문 맛집</h3>
                    <div style={{height: "100px", display: "flex", flexDirection: "column"}}>
                    {
                      Object.keys(myRestaurantsCntObj).map(area => 
                        <div key={area} style={{ fontSize: "2rem" }}>{area} {myRestaurantsCntObj[area]}개</div>
                      )
                    }
                    </div>
                </div>
                <div style={{ width: "40%"}}>
                    <h3>지역별 나의 위시 맛집</h3>
                    <div style={{height: "100px", display: "flex", flexDirection: "column"}}>
                    {
                      Object.keys(myWishlistsCntObj).map(area => 
                        <div key={area} style={{ fontSize: "2rem" }}>{area} {myWishlistsCntObj[area]}개</div>
                      )
                    }
                    </div>
                </div>
            </div>
            <div style={{ width: "50%", margin: "auto"}}>
                <h3>나의 방문 맛집 달력</h3>
            </div>
        </div>
        <hr />
        <Footer />
      </div>
    </div>
  );
}

export default withRouter(MyInfoPage);
