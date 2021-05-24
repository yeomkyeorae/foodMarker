import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  readRestaurantsNoImage,
  readRestaurantsTop5,
  readRestaurantMost
} from "../../../_actions/restaurant_action";
import NavbarComp from "../Navbar/NavbarComp";
import KakaoMap from "../../containers/KakaoMap/KakaoMap";
import Footer from "../Footer/Footer";
import "@brainhubeu/react-carousel/lib/style.css";
import styled from "styled-components";

const H2 = styled.h2`
  font-weight: 100;
`;

const P = styled.p`
  width: 50px;
  cursor: pointer;
  border-radius: 20px;
  background-color: #e5f3e6;
  font-weight: 200;
  &:hover {
    background-color: #c1e8c2;
  }
`;

/* animation: ${move} 1s ease-in-out 0.5s 2 alternate; */
const ImgDiv = styled.div`
  display: inline-block;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  display: inline-block;
  ${props =>
    props.right
      ? `border-left: 10px solid #a5e2a6;`
      : `border-right: 10px solid #a5e2a6;`}
  ${props =>
    props.right ? `margin-left: 10px;` : `margin-right: 10px;`}
  &:hover {
    cursor: pointer;
  }
`;

function MainPage(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [carouselPage, setCarouselPage] = useState(0);

  const [mostRestaurant, setMostRestaurant] = useState({
    name: "",
    address: "",
    count: ""
  });

  const dispatch = useDispatch();
  const userId = props.location.state;
  const body = {
    id: userId,
    option: "서울"
  };

  useEffect(() => {
    dispatch(readRestaurantsNoImage(body)).then(response => {
      setRestaurants(response.payload);
    });
    dispatch(readRestaurantsTop5(userId)).then(response => {
      const restaurants = response.payload.data.restaurants;

      const newTopRestaurants = [];
      for (let i = 0; i < 5; i++) {
        if (i < restaurants.length) {
          newTopRestaurants.push(restaurants[i]);
        } else {
          newTopRestaurants.push({
            imgURL:
              "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          });
        }
      }
      setTopRestaurants(newTopRestaurants);
    });
    dispatch(readRestaurantMost()).then(response => {
      const count = response.payload.data.restaurant[0].count;
      const name = response.payload.data.restaurant[0]._id.name;
      const address = response.payload.data.restaurant[0]._id.address;

      setMostRestaurant({ name, address, count });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [latitude, setLatitude] = useState(37.52393);
  const [longitude, setLongitude] = useState(126.980493);
  const [mapLevel, setMapLevel] = useState(8);

  const onClickHandler = option => {
    let optionLocation;
    if (option === 1) {
      // 영동군
      setLatitude(36.1746815);
      setLongitude(127.7830354);
      setMapLevel(13);
    } else if (option === 2) {
      // 국립중앙박물관
      setLatitude(37.52393);
      setLongitude(126.980493);
      setMapLevel(8);
      optionLocation = "서울";
    } else if (option === 3) {
      // 대전 용문역
      setLatitude(36.338262);
      setLongitude(127.392768);
      setMapLevel(8);
      optionLocation = "대전";
    } else if (option === 4) {
      // 세종 종촌동
      setLatitude(36.497149);
      setLongitude(127.260632);
      setMapLevel(8);
      optionLocation = "세종";
    }
    const body = {
      id: userId,
      optionLocation: optionLocation ? optionLocation : undefined
    };
    dispatch(readRestaurantsNoImage(body)).then(response => {
      setRestaurants(response.payload);
    });
  };

  const nextClickHandler = type => {
    setCarouselPage((carouselPage + 1) % 5);
  };

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          bottom: "50px",
          left: "0px",
          right: "0px",
          overflow: "auto"
        }}
      >
        <NavbarComp userId={userId} history={props.history} />
        <div style={{ backgroundColor: "#FAF7F2" }}>
          <div
            style={{
              display: "flex",
              height: "10vh",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div
              style={{
                width: "90%",
                textAlign: "left"
              }}
            >
              <span style={{ fontWeight: "800", fontSize: "2rem" }}>
                푸드마커로 맛집의 지도를 완성해 보세요
              </span>
            </div>
          </div>
          <div
            style={{
              height: "30vh",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div style={{ margin: "auto", textAlign: "left" }}>
              <span style={{ fontWeight: "500", fontSize: "1.5rem" }}>
                나의 맛집
              </span>
              <br />
              <span>당신이 최근에 방문한 최고의 맛집은 어디인가요?</span>
              <br />
              <span>인상 깊은 식당을 등록해 보세요.</span>
            </div>
            <div style={{ margin: "auto", textAlign: "left" }}>
              <span style={{ fontWeight: "500", fontSize: "1.5rem" }}>
                위시 맛집
              </span>
              <br />
              <span>시선을 사로잡은 맛집은 어디인가요?</span>
              <br />
              <span>방문하고자 하는 식당을 기록해 보세요.</span>
            </div>
            <div style={{ margin: "auto", textAlign: "left" }}>
              <span style={{ fontWeight: "500", fontSize: "1.5rem" }}>
                최자로드
              </span>
              <br />
              <span>최자로드에 등장한 맛집이 궁금하신가요?</span>
              <br />
              <span>자형과 함께 해보세요.</span>
              <br />
              <span></span>
            </div>
          </div>
        </div>
        <div style={{ padding: "5px" }}>
          <H2>나의 맛집 지도</H2>
        </div>
        <ul
          style={{
            padding: "0px",
            display: "flex",
            justifyContent: "center",
            listStyle: "none",
            margin: "0px"
          }}
        >
          <li
            style={{
              margin: "5px"
            }}
          >
            <P onClick={() => onClickHandler(1)}>전국</P>
          </li>
          <li
            style={{
              margin: "5px"
            }}
          >
            <P onClick={() => onClickHandler(2)}>서울</P>
          </li>
          <li
            style={{
              margin: "5px"
            }}
          >
            <P onClick={() => onClickHandler(3)}>대전</P>
          </li>
          <li
            style={{
              margin: "5px"
            }}
          >
            <P onClick={() => onClickHandler(4)}>세종</P>
          </li>
        </ul>
        <div>
          <KakaoMap
            latitude={latitude}
            longitude={longitude}
            mapLevel={mapLevel}
            restaurants={restaurants}
            width={"100%"}
            inlineBlock={false}
          />
        </div>
        <div
          style={{
            marginBottom: "10px",
            backgroundColor: "#edfcee",
            margin: "0",
            height: "60vh"
          }}
        >
          <div style={{ paddingTop: "20px" }}>
            <H2>최근에 등록된 나의 맛집들</H2>
          </div>
          <ol
            style={{
              listStyle: "none",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              height: "80%",
              margin: "0",
              padding: "0"
            }}
          >
            {Array(10)
              .fill(0)
              .map((el, ix) => (
                <li style={{ width: "20%" }} key={ix}>
                  <div>
                    <img
                      src={
                        "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
                      }
                      alt=""
                      width="180px"
                      height="200px"
                    />
                  </div>
                  <div>
                    <span style={{ fontWeight: "300" }}>
                      {mostRestaurant.name}
                    </span>
                  </div>
                </li>
              ))}
          </ol>
        </div>
        <div
          style={{
            marginBottom: "10px",
            backgroundColor: "#FAFDF3",
            margin: "0",
            height: "60vh"
          }}
        >
          <div style={{ paddingTop: "20px" }}>
            <H2>최근에 등록된 위시 맛집들</H2>
          </div>
          <ol
            style={{
              listStyle: "none",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              height: "80%",
              margin: "0",
              padding: "0"
            }}
          >
            {Array(10)
              .fill(0)
              .map((el, ix) => (
                <li style={{ width: "20%" }} key={ix}>
                  <div>
                    <span style={{ fontWeight: "300" }}>
                      {mostRestaurant.name} <br />
                      {mostRestaurant.address} <br />
                      duarufp06
                    </span>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(MainPage);
