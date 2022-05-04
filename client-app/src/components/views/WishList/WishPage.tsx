import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Enroll from "../MarkerPage/Enroll";
import WishList from "./WishList";
import NavbarComp from "../Navbar/NavbarComp";
import Footer from "../Footer/Footer";
import { Button } from "react-bootstrap";
import { NavMenuType } from '../../../library/def';

interface Props {
  history: RouteComponentProps["history"];
}


function WishPage({ history }: Props): React.ReactElement {
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
    MenuComponent = <WishList />;
  } else {
    MenuComponent = (
      <Enroll
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
          left: "0px",
          right: "0px",
          overflow: "auto"
        }}
      >
        <NavbarComp history={history} menu={NavMenuType.Wish} />
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
        <Footer marginTop={5} />
      </div>
    </div>
  );
}

export default withRouter(WishPage);
