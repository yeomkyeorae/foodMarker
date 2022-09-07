import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import RestaurantList from "./RestaurantList";
import Enroll from "./Enroll";
import NavbarComp from "../Navbar/NavbarComp";
import Footer from "../Footer/Footer";
import { Button } from "react-bootstrap";
import { NavMenuType } from '../../../library/def';
import styled from "styled-components";


const MainDiv = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  position: absolute;
  top: 10px;
  left: 0px;
  right: 0px;
  overflow: hidden;
`;

interface Props {
  history: RouteComponentProps["history"];
}

function MarkerPage({ history }: Props): React.ReactElement {
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
    MenuComponent = <RestaurantList />;
  } else {
    MenuComponent = (
      <Enroll
        parentCompName={"MarkerPage"}
        setToggle={setToggle}
        setMenu={setMenu}
      />
    );
  }

  return (
    <MainDiv>
      <NavbarComp history={history} menu={NavMenuType.Marker} />
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
    </MainDiv>
  );
}

export default withRouter(MarkerPage);
