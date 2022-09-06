import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import NavbarComp from "../Navbar/NavbarComp";
import Footer from "../Footer/Footer";
import ChoizaList from "./ChoizaList";
import styled from "styled-components";
import { NavMenuType, ChoizaRoadSeason } from '../../../library/def';


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
  const [season, setSeason] = useState<number>(ChoizaRoadSeason.Seven);
  const [seasonName, setSeasonName] = useState<string>("시즌7");

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
        <Div color={`${season === ChoizaRoadSeason.One}`} onClick={() => onClickHandler("시즌1", ChoizaRoadSeason.One)}>시즌1</Div>
        <Div color={`${season === ChoizaRoadSeason.Two}`} onClick={() => onClickHandler("시즌2", ChoizaRoadSeason.Two)}>시즌2</Div>
        <Div color={`${season === ChoizaRoadSeason.Three}`} onClick={() => onClickHandler("시즌3", ChoizaRoadSeason.Three)}>시즌3</Div>
        <Div color={`${season === ChoizaRoadSeason.Four}`} onClick={() => onClickHandler("시즌4", ChoizaRoadSeason.Four)}>시즌4</Div>
        <Div color={`${season === ChoizaRoadSeason.InTheHouse}`} onClick={() => onClickHandler("인더하우스", ChoizaRoadSeason.InTheHouse)}>인더하우스</Div>
        <Div color={`${season === ChoizaRoadSeason.Five}`} onClick={() => onClickHandler("시즌5", ChoizaRoadSeason.Five)}>시즌5</Div>
        <Div color={`${season === ChoizaRoadSeason.Six}`} onClick={() => onClickHandler("시즌6", ChoizaRoadSeason.Six)}>시즌6</Div>
        <Div color={`${season === ChoizaRoadSeason.Seven}`} onClick={() => onClickHandler("시즌7", ChoizaRoadSeason.Seven)}>시즌7</Div>
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
