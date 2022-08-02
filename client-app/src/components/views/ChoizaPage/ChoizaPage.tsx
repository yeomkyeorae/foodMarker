import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import NavbarComp from "../Navbar/NavbarComp";
import Footer from "../Footer/Footer";
import ChoizaList from "./ChoizaList";
import styled from "styled-components";
import { NavMenuType } from '../../../library/def';


const Div = styled.div`
  display: inline-block;
  width: 10rem;
  color: ${props => props.color === 'true' ? '#ff6700' : 'black'};
  &:hover {
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
    color: #ff6700;
  }
  cursor: pointer;
`;


interface Props {
  history: RouteComponentProps["history"];
}


function ChoizaPage({ history }: Props): React.ReactElement {
  const [season, setSeason] = useState(8);
  const [seasonName, setSeasonName] = useState("시즌7");

  const onClickHandler = (seansonName: string, season: number) => {
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
        <NavbarComp history={history} menu={NavMenuType.Choizaroad} />
        <hr />
        <Div color={`${season === 1}`} onClick={() => onClickHandler("시즌1", 1)}>시즌1</Div>
        <Div color={`${season === 2}`} onClick={() => onClickHandler("시즌2", 2)}>시즌2</Div>
        <Div color={`${season === 3}`} onClick={() => onClickHandler("시즌3", 3)}>시즌3</Div>
        <Div color={`${season === 4}`} onClick={() => onClickHandler("시즌4", 4)}>시즌4</Div>
        <Div color={`${season === 5}`} onClick={() => onClickHandler("인더하우스", 5)}>인더하우스</Div>
        <Div color={`${season === 6}`} onClick={() => onClickHandler("시즌5", 6)}>시즌5</Div>
        <Div color={`${season === 7}`} onClick={() => onClickHandler("시즌6", 7)}>시즌6</Div>
        <Div color={`${season === 8}`} onClick={() => onClickHandler("시즌7", 8)}>시즌7</Div>
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
