import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  readRestaurants,
  deleteRestaurant
} from "../../../_actions/restaurant_action";
import styled from "styled-components";

const Restaurants = styled.div`
  width: 300px;
  height: 400px;
  display: inline-block;
  overflow-y: scroll;
`;

const List = styled.ol`
  list-style: none;
  width: 600px;
  max-width: 70%;
`;

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

function RestaurantList(props) {
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState([{ _id: 0 }]);
  const body = {
    id: props.userId
  };

  const clickRestaurant = (restaurantAddress, restaurantName) => {
    props.setAddress(restaurantAddress);
    props.setRestaurantName(restaurantName);
  };

  useEffect(() => {
    dispatch(readRestaurants(body)).then(response => {
      setRestaurants(response.payload);
    });
  }, [JSON.stringify(restaurants)]);

  const deleteHandler = restaurantId => {
    dispatch(deleteRestaurant(restaurantId)).then(response => {
      if (response.payload.success) {
        setRestaurants(
          restaurants.filter(restaurant => restaurant._id !== restaurantId)
        );
      }
    });
  };

  return (
    <Restaurants>
      <List>
        {restaurants.map(restaurant => (
          <Item
            key={restaurant._id}
            onClick={() => clickRestaurant(restaurant.address, restaurant.name)}
          >
            <FoodImg src="https://images.unsplash.com/photo-1595576359780-91004705b4f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"></FoodImg>
            <HeadLine>{restaurant.name}</HeadLine>
            <button onClick={() => deleteHandler(restaurant._id)}>삭제</button>
            <span>{restaurant.date}</span> <br />
            <hr />
            <span>{restaurant.address}</span>
          </Item>
        ))}
      </List>
    </Restaurants>
  );
}

export default withRouter(RestaurantList);
