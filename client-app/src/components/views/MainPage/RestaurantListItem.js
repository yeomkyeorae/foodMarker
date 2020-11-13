import React from "react";
import { withRouter } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";

const Item = styled.li`
  display: block;
  clear: both;
  counter-increment: list;
  padding-bottom: 4rem;
  font-size: 1.1rem;
  line-height: 1.375;
  position: relative;
`;

const HeadLine = styled.h2`
  padding: 0rem 0 0 0;
  margin: 0 0 1rem 0;
  font: normal 2rem var(--font-head);
`;

const FoodImg = styled.img`
  max-width: 100%;
  height: auto;
`;

function RestaurantListItem(props) {
  const restaurant = props.restaurant;

  const clickRestaurant = (restaurantAddress, restaurantName) => {
    props.setAddress(restaurantAddress);
    props.setRestaurantName(restaurantName);
  };

  return (
    <Card
      style={{ width: "100%" }}
      onClick={() => clickRestaurant(restaurant.address, restaurant.name)}
    >
      <Card.Body>
        <Card.Title>{restaurant.name}</Card.Title>
        <div
          style={{
            width: "200px",
            minHeight: "200px",
            maxHeight: "auto",
            float: "left",
            margin: "3px",
            padding: "3px"
          }}
        >
          <Card.Img
            variant="top"
            src={restaurant.imgURL}
            style={{
              maxWidth: "100%",
              height: "auto"
            }}
          />
        </div>
        <Card.Text style={{ display: "inline-block" }}>
          방문 일시: {restaurant.date} <br />
          주소: {restaurant.address}
        </Card.Text>
        <Button
          variant="primary"
          onClick={() => props.deleteHandler(restaurant._id)}
          style={{ display: "inline-block" }}
        >
          삭제
        </Button>
      </Card.Body>
    </Card>
  );
}

export default withRouter(RestaurantListItem);
