import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  readRestaurants,
  readRestaurantsCount,
  deleteRestaurant
} from "../../../_actions/restaurant_action";
import RestaurantListItem from "./RestaurantListItem";
import { Row } from "react-bootstrap";
import styled from "styled-components";

const Div = styled.div`
  width: 50%;
  display: inline-block;
`;

const Restaurants = styled.div`
  width: 100%;
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
  const [totalItemCount, setTotalItemCount] = useState(0);

  const body = {
    id: props.userId,
    page: 2
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

  const sortByName = () => {
    const newArr = [...restaurants].sort((a, b) => {
      const nameA = a.name;
      const nameB = b.name;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setRestaurants(newArr);
  };

  const sortByDate = () => {
    const newArr = [...restaurants].sort((a, b) => {
      const dateA = Number(new Date(a.date));
      const dateB = Number(new Date(b.date));
      if (dateA > dateB) {
        return 1;
      }
      if (dateA < dateB) {
        return -1;
      }
      return 0;
    });
    setRestaurants(newArr);
  };

  useEffect(() => {
    dispatch(readRestaurantsCount(body)).then(response => {
      setTotalItemCount(response.payload);

      dispatch(readRestaurants(body)).then(response => {
        setRestaurants(response.payload);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Div>
      <span
        style={{ margin: "10px", display: "inline-block", cursor: "pointer" }}
        onClick={sortByName}
      >
        식당 이름 순
      </span>
      <span
        style={{ margin: "10px", display: "inline-block", cursor: "pointer" }}
        onClick={sortByDate}
      >
        방문 날짜 순
      </span>
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
    </Div>
  );
}

export default withRouter(RestaurantList);
