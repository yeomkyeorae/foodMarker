import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import ChoizaListItem from "./ChoizaListItem";
import {
  readChoizaRoad
  // registerCHoizaRoad
} from "../../../_actions/choizaRoad_action";

const ChoizaRoads = styled.div`
  width: 100%;
  height: 100%;
  display: inline-block;
  overflow-y: scroll;
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

  useEffect(() => {
    dispatch(readChoizaRoad()).then(response => {
      setChoizaRoads(response.payload.data.choizaRoads);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChoizaRoads>
      <List>
        <Row className="show-grid">
          {choizaRoads.map(choizaRoad => (
            <ChoizaListItem
              key={choizaRoad._id}
              choizaRoad={choizaRoad}
            ></ChoizaListItem>
          ))}
        </Row>
      </List>
    </ChoizaRoads>
  );
}

export default withRouter(ChoizaList);
