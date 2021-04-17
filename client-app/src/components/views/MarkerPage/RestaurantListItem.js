import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Card, Col, Button } from "react-bootstrap";
import UpdateModal from "../../containers/UpdateModal/UpdateModal";
import ReactStars from "react-rating-stars-component";

function RestaurantListItem(props) {
  const restaurant = props.restaurant;

  const restaurantDateSplit = String(restaurant.date).split("-");
  const restaurantDate = `${restaurantDateSplit[0]}년 ${restaurantDateSplit[1]}월 ${restaurantDateSplit[2]}일`;
  const [Toggle, setToggle] = useState(false);
  const Rating = restaurant.rating;

  const updateHandler = e => {
    setToggle(!Toggle);
  };

  const clickRestaurant = (restaurantAddress, restaurantName) => {
    props.setAddress(restaurantAddress);
    props.setRestaurantName(restaurantName);
  };

  return restaurant.address ? (
    <>
      <Col md={6}>
        <Card
          style={{ width: "100%" }}
          onClick={() => clickRestaurant(restaurant.address, restaurant.name)}
        >
          <Card.Body>
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
            <ReactStars
              count={5}
              value={Rating}
              edit={false}
              size={50}
              isHalf={true}
              activeColor="#ffd700"
            />
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
            <div>
              <Button
                variant="warning"
                onClick={() => updateHandler()}
                style={{
                  display: "inline-block",
                  margin: "2px",
                  color: "white"
                }}
              >
                수정
              </Button>
              <Button
                variant="primary"
                onClick={() => props.deleteHandler(restaurant._id)}
                style={{ display: "inline-block", margin: "2px" }}
              >
                삭제
              </Button>
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
    </>
  ) : null;
}

export default withRouter(RestaurantListItem);
