import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { readRestaurants } from "../../../_actions/restaurant_action";

function RestaurantList(props) {
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState([{_id: 0}]);
  const body = {
    "id": props.userId
  }

  const test = 1;
  useEffect(() => {
    dispatch(readRestaurants(body)).then(response => {
      setRestaurants(response.payload);
    });
  }, [restaurants[0]._id]);

  return (
    <div>
      <ul>
        {restaurants.map(restaurant => <li key={restaurant._id}>{restaurant.name}</li>)}
      </ul>
    </div>
  );
}

export default withRouter(RestaurantList);
