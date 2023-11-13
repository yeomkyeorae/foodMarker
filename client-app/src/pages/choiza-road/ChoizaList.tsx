import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import ChoizaListItem from './ChoizaListItem';
import { readChoizaRoad, readVisitedChoizaRoad } from '../../_actions/choizaRoad_action';
import { ChoizaRoad, VisitedChoizaRoads } from '../../interfaces/ChoizaRoad';
import * as S from './ChoizaList.style';
import { useAuthContext } from '../../context/auth';

interface Props extends RouteComponentProps {
  season: number;
}

function ChoizaList(props: Props): React.ReactElement {
  const dispatch = useDispatch<any>();
  const [choizaRoads, setChoizaRoads] = useState<ChoizaRoad[]>([]);
  const [visitedChoizaRoads, setVisitedChoizaRoads] = useState<VisitedChoizaRoads[]>([]);

  const user = useAuthContext();
  const userId = user.userId as string;

  const season = props.season;

  useEffect(() => {
    dispatch(readChoizaRoad(season)).then((response) => {
      setChoizaRoads(response.payload.data.choizaRoads);

      dispatch(readVisitedChoizaRoad(userId, season)).then((response) => {
        setVisitedChoizaRoads(response.payload.data.visitedChoizaRoads);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [season]);

  return (
    <S.ChoizaRoads>
      <S.List>
        <Row className='show-grid'>
          {choizaRoads.map((choizaRoad) => (
            <ChoizaListItem
              key={choizaRoad._id}
              choizaRoad={choizaRoad}
              season={season}
              visitedChoizaRoads={visitedChoizaRoads}
            ></ChoizaListItem>
          ))}
        </Row>
      </S.List>
    </S.ChoizaRoads>
  );
}

export default withRouter(ChoizaList);
