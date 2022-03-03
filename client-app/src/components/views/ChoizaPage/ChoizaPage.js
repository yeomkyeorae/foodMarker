import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import NavbarComp from "../Navbar/NavbarComp";
import Footer from "../Footer/Footer";
import ChoizaList from "./ChoizaList";
import styled from "styled-components";

const Div = styled.div`
  display: inline-block;
  width: 10rem;
  &:hover {
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
    color: #ff6700;
  }
  cursor: pointer;
`;

function ChoizaPage(props) {
  const { userId } = props.location.state;
  const [season, setSeason] = useState(6);
  const [seasonName, setSeasonName] = useState("시즌5");

  const onClickHandler = (seansonName, season) => {
    setSeason(season);
    setSeasonName(seansonName);
  };

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "0px",
          right: "0px",
          overflow: "hidden"
        }}
      >
        <NavbarComp userId={userId} history={props.history} />
        <hr />
        <Div onClick={() => onClickHandler("시즌1", 1)}>시즌1</Div>
        <Div onClick={() => onClickHandler("시즌2", 2)}>시즌2</Div>
        <Div onClick={() => onClickHandler("시즌3", 3)}>시즌3</Div>
        <Div onClick={() => onClickHandler("시즌4", 4)}>시즌4</Div>
        <Div onClick={() => onClickHandler("인더하우스", 5)}>인더하우스</Div>
        <Div onClick={() => onClickHandler("시즌5", 6)}>시즌5</Div>
        <hr />
        <h2 style={{ marginTop: "50px" }}>
          {seasonName}
        </h2>
        <ChoizaList season={season} />
        <Footer />
      </div>
    </div>
  );
}

export default withRouter(ChoizaPage);
