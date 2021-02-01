import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Enroll from "../MarkerPage/Enroll";
import WishList from "./WishList";
import NavbarComp from "../Navbar/NavbarComp";
import { Button } from "react-bootstrap";

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
        setMenu={setMenu}
      />
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <NavbarComp userId={userId} history={props.history} />
      <div style={{}}>
        <Button
          variant="secondary"
          onClick={onClickChangeMenuHandler}
          style={{ margin: "20px" }}
        >
          {Menu}
        </Button>
      </div>
      {MenuComponent}
    </div>
  );
}

export default withRouter(WishPage);
