import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Card, Col, Dropdown } from "react-bootstrap";
import UpdateModal from "../../containers/UpdateModal/UpdateModal";
import KakaoMapModal from "../../containers/KakaoMap/KakaoMapModal";
import ReactStars from "react-rating-stars-component";

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
  const [Toggle, setToggle] = useState(false);
  const [mapToggle, setMapToggle] = useState(false);
  const Rating = restaurant.rating;

  const popUpMap = () => {
    setMapToggle(true);
  };

  const updateHandler = e => {
    setToggle(!Toggle);
  };

  const clickRestaurant = (restaurantAddress, restaurantName) => {
    props.setAddress(restaurantAddress);
    props.setRestaurantName(restaurantName);
  };

  return restaurant.address ? (
    <>
      <Col md={12} style={{ paddingBottom: "10px" }}>
        <Card
          style={{ width: "100%" }}
          onClick={() => clickRestaurant(restaurant.address, restaurant.name)}
        >
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
                  {restaurantDate}
                </span>
              </Card.Title>
              <span style={{ fontSize: "0.8em" }}>{restaurant.address}</span>
            </div>
            <div style={{ width: "40%", margin: "auto" }}>
              <ReactStars
                count={5}
                value={Rating}
                edit={false}
                size={35}
                isHalf={true}
                activeColor="#ffd700"
              />
            </div>
            <div
              style={{
                width: "100%",
                height: "360px",
                overflow: "hidden"
              }}
            >
              <Card.Img
                variant="top"
                src={restaurant.imgURL}
                style={{
                  width: "100%",
                  height: "100%"
                }}
              />
            </div>
          </Card.Body>
        </Card>
      </Col>
      <UpdateModal
        Toggle={Toggle}
        setToggle={setToggle}
        restaurantName={restaurant.name}
        restaurantId={restaurant._id}
        restaurantDate={restaurant.date}
        Rating={Rating}
        type="RestaurantListItem"
      />
      <KakaoMapModal
        Toggle={mapToggle}
        setToggle={setMapToggle}
        restaurant={restaurant}
      />
    </>
  ) : null;
}

export default withRouter(RestaurantListItem);
