import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import NavbarComp from '../Navbar/Navbar';
import Footer from '../../components/containers/Footer/Footer';
import ChoizaList from './ChoizaList';
import { NavMenuType, ChoizaRoadSeason } from '../../library/def';
import * as S from './ChoizaPage.style';

interface Props {
  history: RouteComponentProps['history'];
}

function ChoizaPage({ history }: Props): React.ReactElement {
  const [season, setSeason] = useState<number>(ChoizaRoadSeason.Seven);
  const [seasonName, setSeasonName] = useState<string>('시즌8');

  const onClickHandler = (seansonName: string, season: number) => {
    setSeason(season);
    setSeasonName(seansonName);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: '0px',
        right: '0px',
        overflow: 'hidden',
      }}
    >
      <NavbarComp history={history} menu={NavMenuType.Choizaroad} />
      <hr />
      <S.SeasonDiv
        color={`${season === ChoizaRoadSeason.One}`}
        onClick={() => onClickHandler('시즌1', ChoizaRoadSeason.One)}
      >
        시즌1
      </S.SeasonDiv>
      <S.SeasonDiv
        color={`${season === ChoizaRoadSeason.Two}`}
        onClick={() => onClickHandler('시즌2', ChoizaRoadSeason.Two)}
      >
        시즌2
      </S.SeasonDiv>
      <S.SeasonDiv
        color={`${season === ChoizaRoadSeason.Three}`}
        onClick={() => onClickHandler('시즌3', ChoizaRoadSeason.Three)}
      >
        시즌3
      </S.SeasonDiv>
      <S.SeasonDiv
        color={`${season === ChoizaRoadSeason.Four}`}
        onClick={() => onClickHandler('시즌4', ChoizaRoadSeason.Four)}
      >
        시즌4
      </S.SeasonDiv>
      <S.SeasonDiv
        color={`${season === ChoizaRoadSeason.InTheHouse}`}
        onClick={() => onClickHandler('인더하우스', ChoizaRoadSeason.InTheHouse)}
      >
        인더하우스
      </S.SeasonDiv>
      <S.SeasonDiv
        color={`${season === ChoizaRoadSeason.Five}`}
        onClick={() => onClickHandler('시즌5', ChoizaRoadSeason.Five)}
      >
        시즌5
      </S.SeasonDiv>
      <S.SeasonDiv
        color={`${season === ChoizaRoadSeason.Six}`}
        onClick={() => onClickHandler('시즌6', ChoizaRoadSeason.Six)}
      >
        시즌6
      </S.SeasonDiv>
      <S.SeasonDiv
        color={`${season === ChoizaRoadSeason.Seven}`}
        onClick={() => onClickHandler('시즌7', ChoizaRoadSeason.Seven)}
      >
        시즌7
      </S.SeasonDiv>
      <S.SeasonDiv
        color={`${season === ChoizaRoadSeason.Eight}`}
        onClick={() => onClickHandler('시즌8', ChoizaRoadSeason.Eight)}
      >
        시즌8
      </S.SeasonDiv>
      <hr />
      <h2 style={{ marginTop: '50px' }}>{seasonName}</h2>
      <ChoizaList season={season} />
      <Footer />
    </div>
  );
}

export default withRouter(ChoizaPage);
