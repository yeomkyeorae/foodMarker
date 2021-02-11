import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import NavbarComp from "../Navbar/NavbarComp";
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
  const userId = props.location.state;
  const [season, setSeason] = useState(0);

  const onClickHandler = season => {
    setSeason(season);
  };

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <NavbarComp userId={userId} history={props.history} />
      <hr />
      <Div onClick={() => onClickHandler(1)}>시즌1</Div>
      <Div onClick={() => onClickHandler(2)}>시즌2</Div>
      <Div onClick={() => onClickHandler(3)}>시즌3</Div>
      <Div onClick={() => onClickHandler(4)}>시즌4</Div>
      <ChoizaList season={season} />
    </div>
  );
}

export default withRouter(ChoizaPage);
