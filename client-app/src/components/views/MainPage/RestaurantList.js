import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { readRestaurants } from "../../../_actions/restaurant_action";
import styled from "styled-components";

const List = styled.ol`
  list-style: none;
  width: 600px;
  max-width: 90%;
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

function RestaurantList(props) {
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState([{ _id: 0 }]);
  const body = {
    id: props.userId
  };

  const test = 1;
  useEffect(() => {
    dispatch(readRestaurants(body)).then(response => {
      setRestaurants(response.payload);
    });
  }, [restaurants[0]._id]);

  return (
    <div>
      <List>
        {restaurants.map(restaurant => (
          <Item key={restaurant._id}>
            <HeadLine>{restaurant.name}</HeadLine>{" "}
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Veritatis, distinctio ad corporis, laboriosam unde provident,
              architecto tenetur ea odio debitis delectus explicabo eum
              obcaecati vitae facere iusto laborum consequuntur neque.
            </span>
          </Item>
        ))}
      </List>
    </div>
  );
}

export default withRouter(RestaurantList);
