import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import Restaurants from "./Restaurants";
import EnrollRestaurant from "./EnrollRestaurant";

function MainPage(props) {
  const dispatch = useDispatch();
  const userId = props.location.state.userId;
  const [Toggle, setToggle] = useState(true);
  const [Menu, setMenu] = useState("식당 등록");

  const onClickChangeMenuHandler = () => {
    setToggle(!Toggle);
    if (Menu === "식당 등록") {
      setMenu("식당 리스트");
    } else {
      setMenu("식당 등록");
    }
  };

  const onClickHandler = () => {
    dispatch(logoutUser()).then(response => {
      if (response.payload.success) {
        props.history.push("/loginSignup");
      } else {
        console.log(response);
        alert("failed to logout");
      }
    });
  };

  let MenuComponent;
  if (Toggle) {
    MenuComponent = <Restaurants userId={userId} />;
  } else {
    MenuComponent = <EnrollRestaurant userId={userId} setToggle={setToggle} />;
  }

  return (
    <div>
      <button onClick={onClickHandler} style={{ float: "left" }}>
        로그아웃
      </button>
      <button
        onClick={onClickChangeMenuHandler}
        style={{ marginLeft: "10px", floag: "left" }}
      >
        {Menu}
      </button>
      {MenuComponent}
    </div>
  );
}

export default withRouter(MainPage);
