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
import { Button } from "react-bootstrap";
import Carousel, { autoplayPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import styled, { keyframes } from "styled-components";
import carousel_1 from "../../../assets/carousel_1.jpeg";
import carousel_2 from "../../../assets/carousel_2.jpeg";
import carousel_3 from "../../../assets/carousel_3.jpeg";

const H2 = styled.h2`
  font-weight: 100;
`;

const move = keyframes`
  from {
     transform: translateX(0);
  }
  to {
     transform: translateX(500px);
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
      ? `border-left: 10px solid black;`
      : `border-right: 10px solid black;`}
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
  const [carouselImageList, setCarouselImageList] = useState([
    carousel_1,
    carousel_2,
    carousel_3
  ]);
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
        <hr />
        <Carousel
          autoPlay={5000}
          animationSpeed={1000}
          infinite
          plugins={[
            "infinite",
            {
              resolve: autoplayPlugin,
              options: {
                interval: 2000
              }
            }
          ]}
        >
          {carouselImageList.map((carouselImageURL, index) => (
            <img
              key={index}
              src={carouselImageURL}
              alt=""
              width="90%"
              height="500px"
            />
          ))}
        </Carousel>
        <hr />
        <div style={{ width: "70%", margin: "auto" }}>
          <H2>나의 맛집 지도</H2>
          <Button
            variant="success"
            onClick={() => onClickHandler(1)}
            style={{ margin: "10px", display: "inline-block" }}
          >
            전국
          </Button>
          <Button
            variant="secondary"
            onClick={() => onClickHandler(2)}
            style={{ margin: "10px", display: "inline-block" }}
          >
            서울
          </Button>
          <Button
            variant="primary"
            onClick={() => onClickHandler(3)}
            style={{ margin: "10px", display: "inline-block" }}
          >
            대전
          </Button>
          <Button
            variant="danger"
            onClick={() => onClickHandler(4)}
            style={{ margin: "10px", display: "inline-block" }}
          >
            세종
          </Button>
          <KakaoMap
            latitude={latitude}
            longitude={longitude}
            mapLevel={mapLevel}
            restaurants={restaurants}
            width={"100%"}
            inlineBlock={false}
          />
        </div>
        <hr />
        <div style={{ marginBottom: "10px" }}>
          <div
            style={{
              width: "60%",
              margin: "auto",
              display: "inline-block"
            }}
          >
            <H2>가장 많이 등록된 맛집</H2>
            <div>
              <span>
                {mostRestaurant.name}
                <br /> {mostRestaurant.address}
                <br /> 등록 수: {mostRestaurant.count}
              </span>
            </div>
            <div>
              <img
                src={
                  "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
                }
                alt=""
                width="80%"
                height="80%"
              />
            </div>
          </div>
          <div
            style={{
              width: "40%",
              margin: "auto",
              display: "inline-block"
            }}
          >
            <H2>가장 최근에 별점을 5개 받은 맛집</H2>
            {topRestaurants.length > 0 && (
              <ImgDiv>
                <Arrow right={false} onClick={() => nextClickHandler(0)} />
                <img
                  src={`${topRestaurants[carouselPage].imgURL}`}
                  alt=""
                  width="80%"
                  height="500px"
                />
                <Arrow right={true} onClick={() => nextClickHandler(1)} />
              </ImgDiv>
            )}
          </div>
        </div>
        <br />
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(MainPage);
