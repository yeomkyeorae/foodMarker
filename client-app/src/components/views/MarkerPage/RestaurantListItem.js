import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Card, Col, Dropdown, Carousel } from "react-bootstrap";
import UpdateModal from "../../containers/UpdateModal/UpdateModal";
import KakaoMapModal from "../../containers/KakaoMap/KakaoMapModal";
import ReactStars from "react-rating-stars-component";
import styled from "styled-components";
import "./RestaurantListItem.css";

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  display: inline-block;
  ${props =>
    props.right
      ? `border-left: 10px solid #46CB18;`
      : `border-right: 10px solid #46CB18;`}
  ${props =>
    props.right ? `margin-left: 10px;` : `margin-right: 10px;`}
  &:hover {
    cursor: pointer;
  }
`;

const eatingObj = {
  "1": "아침",
  "2": "점심",
  "3": "저녁",
  "4": "기타"
};

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <span
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ cursor: "pointer" }}
  >
    {children}
  </span>
));

function RestaurantListItem(props) {
  const restaurant = props.restaurant;

  const restaurantDateSplit = String(restaurant.date).split("-");
  const restaurantDate = `${restaurantDateSplit[0]}년 ${restaurantDateSplit[1]}월 ${restaurantDateSplit[2]}일`;
  const [toggle, setToggle] = useState(false);
  const [mapToggle, setMapToggle] = useState(false);
  const [starSize, setStarSize] = useState(window.innerWidth / 30);
  const rating = restaurant.rating;

  let menus = "";
  if (restaurant.menus) {
    const menusArr = JSON.parse(restaurant.menus);
    menusArr.forEach((menu, index) => {
      menus += menu;
      if (menusArr.length - 1 !== index) {
        menus += ", ";
      }
    });
  }

  useEffect(() => {
    function handleSize() {
      setStarSize(parseInt(window.innerWidth / 30));
    }

    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, [])

  const popUpMap = () => {
    setMapToggle(true);
  };

  const updateHandler = e => {
    setToggle(!toggle);
  };

  let imgUrls = [];
  let isMultipleImages = false;
  if (restaurant.imgURL) {
    imgUrls = restaurant.imgURL.split(",");
    isMultipleImages = imgUrls.length > 1 ? true : false;
  }

  return restaurant.address ? (
    <>
      <Col sm={12} md={6} lg={4} style={{ paddingBottom: "10px" }}>
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <div style={{ float: "right" }}>
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>...</Dropdown.Toggle>
                <Dropdown.Menu size="sm" title="">
                  <Dropdown.Item onClick={() => popUpMap()}>지도</Dropdown.Item>
                  <Dropdown.Item onClick={() => updateHandler()}>
                    수정
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => props.deleteHandler(restaurant._id)}
                  >
                    삭제
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div>
              <Card.Title style={{ margin: "0px" }}>
                {restaurant.name}
                <span style={{ fontSize: "0.5em", height: "10px" }}>
                  <br />
                  {restaurantDate}({eatingObj[restaurant.eatingTime]})
                </span>
              </Card.Title>
              <span style={{ fontSize: "0.8em" }}>{restaurant.address}</span>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <ReactStars
                count={5}
                value={rating}
                edit={false}
                size={starSize}
                isHalf={true}
                activeColor="#ffd700"
              />
            </div>
            <span style={{ fontSize: "0.8em" }}>{menus.length > 0 ? menus : '메뉴 등록 x' }</span>
            <div
              style={{
                width: "100%",
                height: "40vw"
              }}
            >
              <Carousel
                variant="dark"
                interval={null}
                controls={isMultipleImages}
                indicators={isMultipleImages}
                prevLabel={""}
                prevIcon={<Arrow right={false} />}
                nextLabel={""}
                nextIcon={<Arrow right={true} />}
                className="carousel"
              >
                {imgUrls.map((url, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <Card.Img
                        className="responsive-image"
                        variant="top"
                        src={url}
                        style={{
                          width: "60%",
                          height: "100%"
                        }}
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
          </Card.Body>
        </Card>
      </Col>
      {toggle ? (
        <UpdateModal
          type="RestaurantListItem"
          toggle={toggle}
          setToggle={setToggle}
          restaurantName={restaurant.name}
          restaurantId={restaurant._id}
          restaurantDate={restaurant.date}
          restaurantImgUrls={imgUrls}
          rating={rating}
          eatingTime={restaurant.eatingTime}
          menus={restaurant.menus}
        />
      ) : null}
      <KakaoMapModal
        Toggle={mapToggle}
        setToggle={setMapToggle}
        restaurant={restaurant}
      />
    </>
  ) : null;
}

export default withRouter(RestaurantListItem);
