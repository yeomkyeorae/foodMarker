import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Restaurants from "./Restaurants";
import Enroll from "./Enroll";
import NavbarComp from "../Navbar/NavbarComp";
import { Button } from "react-bootstrap";

function MainPage(props) {
  const userId = props.location.state;
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

  let MenuComponent;
  if (Toggle) {
    MenuComponent = <Restaurants userId={userId} setToggle={setToggle} />;
  } else {
    MenuComponent = (
      <Enroll
        userId={userId}
        setToggle={setToggle}
        parentCompName={"MainPage"}
      />
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <NavbarComp userId={userId} history={props.history} />
      <div style={{}}>
        <Button
          variant="danger"
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

export default withRouter(MainPage);
