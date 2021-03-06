import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import ChoizaListItem from "./ChoizaListItem";
import {
  readChoizaRoad,
  readVisitedChoizaRoad
} from "../../../_actions/choizaRoad_action";

const ChoizaRoads = styled.div`
  width: 95%;
  height: 100%;
  display: inline-block;
  margin-top: 20px;
`;

const List = styled.ol`
  list-style: none;
  width: 100%;
  max-width: 100%;
`;

function ChoizaList(props) {
  const dispatch = useDispatch();
  const [choizaRoads, setChoizaRoads] = useState([]);
  const [visitedChoizaRoads, setVisitedChoizaRoads] = useState([]);

  const userId = window.sessionStorage.getItem("userId");
  const season = props.season;

  useEffect(() => {
    dispatch(readChoizaRoad(season)).then(response => {
      setChoizaRoads(response.payload.data.choizaRoads);

      dispatch(readVisitedChoizaRoad(userId, season)).then(response => {
        setVisitedChoizaRoads(response.payload.data.visitedChoizaRoads);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [season]);

  return (
    <ChoizaRoads>
      <List>
        <Row className="show-grid">
          {choizaRoads.map(choizaRoad => (
            <ChoizaListItem
              key={choizaRoad._id}
              choizaRoad={choizaRoad}
              season={season}
              visitedChoizaRoads={visitedChoizaRoads}
            ></ChoizaListItem>
          ))}
        </Row>
      </List>
    </ChoizaRoads>
  );
}

export default withRouter(ChoizaList);
