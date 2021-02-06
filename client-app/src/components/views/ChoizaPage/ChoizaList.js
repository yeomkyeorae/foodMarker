import React, { useDispatch, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import ChoizaListItem from "./ChoizaListItem";

const ChoizaRoads = styled.div`
  width: 50%;
  height: 500px;
  display: inline-block;
  overflow-y: scroll;
`;

const List = styled.ol`
  list-style: none;
  width: 100%;
  max-width: 100%;
`;

function ChoizaList(props) {
  const dispatch = useDispatch();
  const [choizaRoads, setChoizaRoads] = useState([{ _id: 0 }]);

  useEffect(() => {
    //   dispatch(readRestaurants(body)).then(response => {
    //     setRestaurants(response.payload);
    //   });
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
