import React, { useDispatch, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import ChoizaListItem from "./ChoizaListItem";

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
  //   const dispatch = useDispatch();
  const [choizaRoads, setChoizaRoads] = useState([
    {
      _id: 0,
      thumbNail:
        "https://i.ytimg.com/vi/lE7XFmWGXDA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDYnJtPnmHtfgjXEReS5FQXdOcRXw",
      youtubeURL: ""
    },
    {
      _id: 1,
      thumbNail:
        "https://i.ytimg.com/vi/lE7XFmWGXDA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDYnJtPnmHtfgjXEReS5FQXdOcRXw",
      youtubeURL: ""
    },
    {
      _id: 2,
      thumbNail:
        "https://i.ytimg.com/vi/lE7XFmWGXDA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDYnJtPnmHtfgjXEReS5FQXdOcRXw",
      youtubeURL: ""
    },
    {
      _id: 3,
      thumbNail:
        "https://i.ytimg.com/vi/lE7XFmWGXDA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDYnJtPnmHtfgjXEReS5FQXdOcRXw",
      youtubeURL: ""
    },
    {
      _id: 4,
      thumbNail:
        "https://i.ytimg.com/vi/lE7XFmWGXDA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDYnJtPnmHtfgjXEReS5FQXdOcRXw",
      youtubeURL: ""
    },
    {
      _id: 5,
      thumbNail:
        "https://i.ytimg.com/vi/lE7XFmWGXDA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDYnJtPnmHtfgjXEReS5FQXdOcRXw",
      youtubeURL: ""
    },
    {
      _id: 6,
      thumbNail:
        "https://i.ytimg.com/vi/lE7XFmWGXDA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDYnJtPnmHtfgjXEReS5FQXdOcRXw",
      youtubeURL: ""
    }
  ]);

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
