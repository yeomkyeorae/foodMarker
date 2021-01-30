import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import RestaurantList from "./RestaurantList";
import KakaoMap from "../../containers/KakaoMap/KakaoMap";

function Restaurants(props) {
  const userId = props.userId;
  const [address, setAddress] = useState("서울 중구 창경궁로 62-29");
  const [restaurantName, setRestaurantName] = useState("우래옥");

  return (
    <div style={{ display: "inline-block", width: "100%" }}>
      <KakaoMap address={address} restaurantName={restaurantName} />
      <RestaurantList
        userId={userId}
        setAddress={setAddress}
        setRestaurantName={setRestaurantName}
      />
    </div>
  );
}

export default withRouter(Restaurants);
