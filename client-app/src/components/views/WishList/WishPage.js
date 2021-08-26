import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Enroll from "../MarkerPage/Enroll";
import WishList from "./WishList";
import NavbarComp from "../Navbar/NavbarComp";
import Footer from "../Footer/Footer";
import { Button } from "react-bootstrap";

function WishPage(props) {
  const userId = props.location.state;
  const [Toggle, setToggle] = useState(true);
  const [Menu, setMenu] = useState("위시 맛집 등록하기");

  const onClickChangeMenuHandler = () => {
    setToggle(!Toggle);
    if (Menu === "위시 맛집 등록하기") {
      setMenu("위시 맛집 목록으로");
    } else {
      setMenu("위시 맛집 등록하기");
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
      <div
        style={{
          position: "absolute",
          top: "10px",
          bottom: "50px",
          left: "0px",
          right: "0px",
          overflow: "auto"
        }}
      >
        <NavbarComp userId={userId} history={props.history} />
        <hr />
        <div style={{}}>
          <Button
            variant="success"
            onClick={onClickChangeMenuHandler}
            style={{ margin: "20px" }}
          >
            {Menu}
          </Button>
        </div>
        <hr />
        {MenuComponent}
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(WishPage);
