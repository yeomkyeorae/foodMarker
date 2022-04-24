import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  readRestaurantsNoImage,
  readTenRestaurants
} from "../../../_actions/restaurant_action";
import { readTenWishList } from "../../../_actions/wishList_action";
import NavbarComp from "../Navbar/NavbarComp";
import KakaoMap from "../../containers/KakaoMap/KakaoMap";
import Footer from "../Footer/Footer";
import "@brainhubeu/react-carousel/lib/style.css";
import styled from "styled-components";
import { RestaurantType } from '../../interfaces/Restaurant';
import { WishListType } from '../../interfaces/WishList';
import { NavMenuType } from '../../../library/def';


const H2 = styled.h2`
  font-size: 2rem;
`;

const FoodMarkerTitle = styled.div`
  display: flex;
  height: 10vh;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 992px) {
    height: 20vh;
  }
`;

const FoodMarkerExplanation = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 992px) {
    display: none;
  }
`;

const OrderList = styled.ol`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  height: 80%;
  margin: 0;
  padding: 0;
`;

const List = styled.li`
  flex: 20%;
  @media screen and (max-width: 992px) {
    flex: 25%;
  }
  @media screen and (max-width: 630px) {
    flex: 50%;
  }
  @media screen and (max-width: 384px) {
    flex: 100%;
  }
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

function MainPage(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [tenRestaurants, setTenRestaurants] = useState<RestaurantType[]>([]);
  const [tenWishList, setTenWishList] = useState<WishListType[]>([]);

  const dispatch = useDispatch<any>();
  const userId = window.sessionStorage.getItem("userId");
  const body = {
    id: userId,
    option: "서울"
  };

  useEffect(() => {
    dispatch(readRestaurantsNoImage(body)).then(response => {
      setRestaurants(response.payload);
    });
    dispatch(readTenRestaurants()).then(response => {
      setTenRestaurants(response.payload.data.restaurants);
    });
    dispatch(readTenWishList()).then(response => {
      setTenWishList(response.payload.wishLists);
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

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "0px",
          right: "0px",
          overflow: "auto"
        }}
      >
        <NavbarComp history={props.history} menu={NavMenuType.Main} />
        <div style={{ backgroundColor: "#FAF7F2" }}>
          <FoodMarkerTitle>
            <div>
              <span style={{ fontWeight: "300", fontSize: "2rem", textAlign: "center" }}>
                푸드마커로 맛집의 지도를 완성해 보세요
              </span>
            </div>
          </FoodMarkerTitle>
          <FoodMarkerExplanation>
            <div style={{ margin: "auto", textAlign: "left" }}>
              <span style={{ fontWeight: "200", fontSize: "1.5rem" }}>
                나의 맛집
              </span>
              <br />
              <span>당신이 최근에 방문한 최고의 맛집은 어디인가요?</span>
              <br />
              <span>인상 깊은 식당을 등록해 보세요.</span>
            </div>
            <div style={{ margin: "auto", textAlign: "left" }}>
              <span style={{ fontWeight: "200", fontSize: "1.5rem" }}>
                위시 맛집
              </span>
              <br />
              <span>시선을 사로잡은 맛집은 어디인가요?</span>
              <br />
              <span>방문하고자 하는 식당을 기록해 보세요.</span>
            </div>
            <div style={{ margin: "auto", textAlign: "left" }}>
              <span style={{ fontWeight: "200", fontSize: "1.5rem" }}>
                최자로드
              </span>
              <br />
              <span>최자로드에 등장한 맛집이 궁금하신가요?</span>
              <br />
              <span>자형과 함께 해보세요.</span>
              <br />
              <span></span>
            </div>
          </FoodMarkerExplanation>
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
            height={"480px"}
            inlineBlock={false}
          />
        </div>
        <div
          style={{
            marginBottom: "10px",
            backgroundColor: "#edfcee",
            margin: "0"
          }}
        >
          <div style={{ paddingTop: "20px", marginBottom: "20px" }}>
            <H2>최근에 등록된 나의 맛집들</H2>
          </div>
          <OrderList>
            {tenRestaurants.map((el, ix) => (
              <List key={ix}>
                <div>
                  <img
                    src={el.imgURL.split(",")[0]}
                    alt=""
                    width="180px"
                    height="200px"
                  />
                </div>
                <div>
                  <div>
                    <p
                      style={{
                        fontWeight: "500",
                        fontSize: "1.5rem",
                        marginBottom: "5px"
                      }}
                    >
                      {el.name}
                    </p>
                    <p style={{ fontWeight: "300", margin: "0" }}>
                      {el.address}
                    </p>
                    <p style={{ fontWeight: "400", margin: "0" }}>
                      {el.username}
                    </p>
                  </div>
                </div>
              </List>
            ))}
          </OrderList>
        </div>
        <div
          style={{
            marginBottom: "10px",
            backgroundColor: "#FAFDF3",
          }}
        >
          <div style={{ paddingTop: "20px", marginBottom: "20px" }}>
            <H2>최근에 등록된 위시 맛집들</H2>
          </div>
          <OrderList>
            {tenWishList.map((wishListItem, ix) => (
              <List key={ix}>
                <div style={{ marginBottom: "5px"}}>
                  <p style={{ fontWeight: "500", fontSize: "1.5rem", margin: "0", whiteSpace: "nowrap"}}>
                    {wishListItem.name}
                  </p>
                  <p style={{ fontWeight: "300", margin: "0" }}>
                    {wishListItem.address}
                  </p>
                  <p style={{ fontWeight: "400", margin: "0" }}>
                    {wishListItem.username}
                  </p>
                </div>
              </List>
            ))}
          </OrderList>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default withRouter(MainPage);
