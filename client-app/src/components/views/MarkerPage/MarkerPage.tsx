import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Restaurants from "./Restaurants";
import Enroll from "./Enroll";
import NavbarComp from "../Navbar/NavbarComp";
import Footer from "../Footer/Footer";
import { Button } from "react-bootstrap";

function MarkerPage(props) {
  const { userId } = props.location.state;
  const [Toggle, setToggle] = useState(true);
  const [Menu, setMenu] = useState("나의 맛집 등록하기");

  const onClickChangeMenuHandler = () => {
    setToggle(!Toggle);
    if (Menu === "나의 맛집 등록하기") {
      setMenu("나의 맛집 목록으로");
    } else {
      setMenu("나의 맛집 등록하기");
    }
  };

  let MenuComponent;
  if (Toggle) {
    MenuComponent = <Restaurants />;
  } else {
    MenuComponent = (
      <Enroll
        userId={userId}
        setToggle={setToggle}
        parentCompName={"MarkerPage"}
        setMenu={setMenu}
      />
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "0px",
          right: "0px",
          overflow: "auto"
        }}
      >
        <NavbarComp userId={userId} history={props.history} />
        <hr />
        <div>
          <Button
            variant="primary"
            onClick={onClickChangeMenuHandler}
            style={{ margin: "20px" }}
          >
            {Menu}
          </Button>
        </div>
        <hr />
        {MenuComponent}
        <Footer />
      </div>
    </div>
  );
}

export default withRouter(MarkerPage);
