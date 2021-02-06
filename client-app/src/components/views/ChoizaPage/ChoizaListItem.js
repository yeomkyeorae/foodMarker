import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";

function ChoizaListItem(props) {
  const choizaRoad = props.choizaRoad;
  //   const dispatch = useDispatch();

  const clickChoizaRoad = () => {
    console.log("clicked!");
  };

  return (
    <Col md={3}>
      <Card style={{ width: "100%" }} onClick={() => clickChoizaRoad()}>
        <Card.Body>
          <div
            style={{
              width: "100%",
              height: "240px",
              overflow: "hidden"
            }}
          >
            <Card.Img
              variant="top"
              src={choizaRoad.thumbNail}
              style={{
                width: "100%",
                height: "100%"
              }}
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default withRouter(ChoizaListItem);
