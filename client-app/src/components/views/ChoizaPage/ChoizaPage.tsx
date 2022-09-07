import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import NavbarComp from "../Navbar/NavbarComp";
import Footer from "../Footer/Footer";
import ChoizaList from "./ChoizaList";
import styled from "styled-components";
import { NavMenuType, ChoizaRoadSeason } from '../../../library/def';


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

const SeasonMenu = styled.div`
  display: inline-block;
  width: 10rem;
  color: ${props => props.color === 'true' ? '#ff6700' : 'black'};
  &:hover {
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
    color: #ff6700;
  }
  cursor: pointer;
`;

const SeasonTitle = styled.h2`
  margin-top: 50px;
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
    <MainDiv>
      <NavbarComp history={history} menu={NavMenuType.Choizaroad} />
      <hr />
      <SeasonMenu color={`${season === ChoizaRoadSeason.One}`} onClick={() => onClickHandler("시즌1", ChoizaRoadSeason.One)}>시즌1</SeasonMenu>
      <SeasonMenu color={`${season === ChoizaRoadSeason.Two}`} onClick={() => onClickHandler("시즌2", ChoizaRoadSeason.Two)}>시즌2</SeasonMenu>
      <SeasonMenu color={`${season === ChoizaRoadSeason.Three}`} onClick={() => onClickHandler("시즌3", ChoizaRoadSeason.Three)}>시즌3</SeasonMenu>
      <SeasonMenu color={`${season === ChoizaRoadSeason.Four}`} onClick={() => onClickHandler("시즌4", ChoizaRoadSeason.Four)}>시즌4</SeasonMenu>
      <SeasonMenu color={`${season === ChoizaRoadSeason.InTheHouse}`} onClick={() => onClickHandler("인더하우스", ChoizaRoadSeason.InTheHouse)}>인더하우스</SeasonMenu>
      <SeasonMenu color={`${season === ChoizaRoadSeason.Five}`} onClick={() => onClickHandler("시즌5", ChoizaRoadSeason.Five)}>시즌5</SeasonMenu>
      <SeasonMenu color={`${season === ChoizaRoadSeason.Six}`} onClick={() => onClickHandler("시즌6", ChoizaRoadSeason.Six)}>시즌6</SeasonMenu>
      <SeasonMenu color={`${season === ChoizaRoadSeason.Seven}`} onClick={() => onClickHandler("시즌7", ChoizaRoadSeason.Seven)}>시즌7</SeasonMenu>
      <hr />
      <SeasonTitle>
        {seasonName}
      </SeasonTitle>
      <ChoizaList season={season} />
      <Footer />
    </MainDiv>
  );
}

export default withRouter(ChoizaPage);
