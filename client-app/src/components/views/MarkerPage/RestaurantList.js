import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  readRestaurants,
  deleteRestaurant
} from "../../../_actions/restaurant_action";
import RestaurantListItem from "./RestaurantListItem";
import { Row } from "react-bootstrap";
import styled from "styled-components";

const Restaurants = styled.div`
  width: 50%;
  height: 540px;
  display: inline-block;
  overflow-y: scroll;
`;

const List = styled.ol`
  list-style: none;
  width: 95%;
  max-width: 100%;
`;

function RestaurantList(props) {
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState([{ _id: 0 }]);
  const body = {
    id: props.userId
  };

  const deleteHandler = restaurantId => {
    dispatch(deleteRestaurant(restaurantId)).then(response => {
      if (response.payload.success) {
        setRestaurants(
          restaurants.filter(restaurant => restaurant._id !== restaurantId)
        );
      }
    });
  };

  useEffect(() => {
    dispatch(readRestaurants(body)).then(response => {
      setRestaurants(response.payload);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Restaurants>
      <List>
        <Row className="show-grid">
          {restaurants.map(restaurant => (
            <RestaurantListItem
              key={restaurant._id}
              setAddress={props.setAddress}
              setRestaurantName={props.setRestaurantName}
              restaurant={restaurant}
              deleteHandler={deleteHandler}
            ></RestaurantListItem>
          ))}
        </Row>
      </List>
    </Restaurants>
  );
}

export default withRouter(RestaurantList);
