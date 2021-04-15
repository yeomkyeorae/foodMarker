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

const Pagination = styled.div`
  display: inline-block;
  margin: 3px;
  font-size: 1.5rem;
  color: ${props => (props.selected ? "#1D800E" : "black")};
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

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

function RestaurantList(props) {
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState([{ _id: 0 }]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [page, setPage] = useState(1);

  const itemPerPage = 1;
  const body = {
    id: props.userId,
    page: page,
    itemPerPage: itemPerPage
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

  const onSetPageHandler = page => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(readRestaurantsCount(body)).then(response => {
      setTotalItemCount(response.payload);

      dispatch(readRestaurants(body)).then(response => {
        setRestaurants(response.payload);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const pages = [];
  for (let i = 0; i < totalItemCount / itemPerPage; i++) {
    pages.push(
      <Pagination
        key={"restaurantPage" + i}
        onClick={() => onSetPageHandler(i + 1)}
        selected={page === i + 1}
      >
        {i + 1}
      </Pagination>
    );
  }

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
      <div>
        <Arrow right={false} />
        <div style={{ display: "inline-block" }}>{pages.map(page => page)}</div>
        <Arrow right={true} />
      </div>
    </Div>
  );
}

export default withRouter(RestaurantList);
