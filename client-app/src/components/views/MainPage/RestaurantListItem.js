import React from "react";
import { withRouter } from "react-router-dom";
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
    <Item onClick={() => clickRestaurant(restaurant.address, restaurant.name)}>
      <FoodImg src={restaurant.imgURL}></FoodImg>
      <HeadLine>{restaurant.name}</HeadLine>
      <button onClick={() => props.deleteHandler(restaurant._id)}>삭제</button>
      <span>{restaurant.date}</span> <br />
      <hr />
      <span>{restaurant.address}</span>
    </Item>
  );
}

export default withRouter(RestaurantListItem);
