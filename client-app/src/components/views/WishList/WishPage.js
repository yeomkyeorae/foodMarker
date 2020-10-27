import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import Enroll from "../MainPage/Enroll";
import NavbarComp from "../Navbar/NavbarComp";

function WishPage(props) {
  const dispatch = useDispatch();
  const userId = props.location.state;
  const [Toggle, setToggle] = useState(true);
  const [Menu, setMenu] = useState("위시리스트 등록");

  const onClickChangeMenuHandler = () => {
    setToggle(!Toggle);
    if (Menu === "위시리스트 등록") {
      setMenu("위시리스트 목록");
    } else {
      setMenu("위시리스트 등록");
    }
  };

  const onClickHandler = () => {
    dispatch(logoutUser()).then(response => {
      if (response.payload.success) {
        props.history.push("/loginSignup");
      } else {
        alert("failed to logout");
      }
    });
  };

  let MenuComponent = <Enroll userId={userId} parentCompName={"WishPage"} />;

  return (
    <div>
      <NavbarComp userId={userId} />
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

export default withRouter(WishPage);
