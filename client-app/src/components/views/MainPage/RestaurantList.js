import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { readRestaurants } from "../../../_actions/restaurant_action";

function RestaurantList(props) {
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState([]);
  const body = {
    "id": "5f5a349a5a348908bb89e550"
  }
  useEffect(() => {
    dispatch(readRestaurants(body)).then(response => {
      console.log(response.payload)
    });
  });

  return (
    <div>
      {restaurants}
    </div>
  );
}

export default withRouter(RestaurantList);
