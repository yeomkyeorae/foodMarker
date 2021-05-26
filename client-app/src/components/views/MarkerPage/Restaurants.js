import React from "react";
import { withRouter } from "react-router-dom";
import RestaurantList from "./RestaurantList";

function Restaurants(props) {
  const userId = window.sessionStorage.getItem("userId");

  return (
    <div style={{ display: "inline-block", width: "100%" }}>
      <RestaurantList userId={userId} />
    </div>
  );
}

export default withRouter(Restaurants);
