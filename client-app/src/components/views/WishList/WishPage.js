import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Enroll from "../MainPage/Enroll";
import WishList from "./WishList";
import NavbarComp from "../Navbar/NavbarComp";

function WishPage(props) {
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

  let MenuComponent;
  if (Toggle) {
    MenuComponent = <WishList userId={userId} setToggle={setToggle} />;
  } else {
    MenuComponent = (
      <Enroll
        userId={userId}
        parentCompName={"WishPage"}
        setToggle={setToggle}
      />
    );
  }

  return (
    <div>
      <NavbarComp userId={userId} history={props.history} />
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
